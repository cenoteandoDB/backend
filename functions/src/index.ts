import "reflect-metadata";
import * as express from "express";
import {onRequest, Request} from "firebase-functions/v2/https";
import {setGlobalOptions} from "firebase-functions/v2";
import {
    ApolloServer,
    BaseContext,
    ContextFunction,
    HeaderMap,
} from "@apollo/server";
import {parse} from "url";
import {CenoteandoApp} from "./graphql/modules/app";

setGlobalOptions({maxInstances: 10});

interface ContextParams {
    req: Request;
}

const server = new ApolloServer({
    gateway: {
        async load() {
            return {executor: CenoteandoApp.createApolloExecutor()};
        },
        onSchemaLoadOrUpdate(callback) {
            callback({apiSchema: CenoteandoApp.schema} as any);
            return () => null;
        },
        async stop() {
            return;
        },
    },
});

const context: ContextFunction<[ContextParams], BaseContext> = async ({ req }) => {
    const token = req.headers.authorization || '';
    return { token };
};

server.startInBackgroundHandlingStartupErrorsByLoggingAndFailingAllRequests();

export const graphql = onRequest(
    {cors: true},
    async (req: Request, res: express.Response) => {
        const headers = new HeaderMap();

        for (const [key, value] of Object.entries(req.headers)) {
            if (typeof value === "string") {
                headers.set(key, value);
            }
        }
        const httpGraphQLResponse = await server.executeHTTPGraphQLRequest({
            context: () => context({req}),
            httpGraphQLRequest: {
                body: req.body,
                headers,
                method: req.method || "POST",
                search: req.url ? parse(req.url).search || "" : "",
            },
        });

        res.statusCode = httpGraphQLResponse.status || 200;

        if (httpGraphQLResponse.body.kind === "complete") {
            res.send(httpGraphQLResponse.body.string);
        } else {
            for await (const chunk of httpGraphQLResponse.body.asyncIterator) {
                res.write(chunk);
            }
            res.end();
        }
    }
);
