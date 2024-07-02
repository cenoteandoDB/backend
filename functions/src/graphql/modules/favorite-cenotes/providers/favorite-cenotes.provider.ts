/* eslint-disable require-jsdoc */
//import { firestore } from "firebase-admin";
import {
    PaginationInput,
    FavoriteCenotes,
    NewFavoriteCenote,
    FavoriteCenotesList
} from "../../../generated-types/graphql";
import {db} from "../../database/db";
//import { ID } from "graphql-modules/shared/types";

const favoriteCenoteDB = db.favorite_cenotes;

export class FavoriteCenoteProvider {
     /**
     * Get all Favorites cenotes.
     *
     * @param {PaginationInput} pagination optional pagination parameter
     * @param {string} userId  The User Id of user to retrieve
     * @return {Promise<FavoriteCenotesList>} list with all variables
     */
     async getFavoriteCenotes(
        pagination: PaginationInput|null = { offset: 0, limit: 25 },
        userId: string|null|undefined
    ): Promise<FavoriteCenotesList> {
        let query: any;
        let countQuery: any;
       
        query =  await favoriteCenoteDB.where('firestore_id', '==', userId);
        countQuery = await favoriteCenoteDB.where('firestore_id', '==', userId);
      
        if (pagination) {
            query = query.offset(pagination.offset).limit(pagination.limit);
        } else {
            query = query.limit(25);
        }

        const [favoriteCenotesSnapshot, totalCountSnapshot] = await Promise.all([query.get(), countQuery.get()]);

        const favoriteCenotes  = favoriteCenotesSnapshot.docs.map((doc: any) => doc.data() as FavoriteCenotes);
        const totalCount = totalCountSnapshot.size;

        return { favoriteCenotes , totalCount };
    }


    /**
     * Creates a varaible.
     *
     * @param {NewFavoriteCenote} favorite_cenotes the variable input to be created
     *
     * @return {Promise<Variable>} the created variable
     */
    async addFavoriteCenote(newFavorite: NewFavoriteCenote): Promise<FavoriteCenotes> {
        const existingFavorites = await favoriteCenoteDB
            .where('cenoteId', '==', newFavorite.cenoteId)
            .where('userId', '==', newFavorite.userId)
            .get();

        if (!existingFavorites.empty) {
            throw new Error(`This favorite cenote already exists for this user.`);
        } 

        const docRef = favoriteCenoteDB.doc();
        await docRef.set({
            firestore_id: docRef.id,
            createdAt: new Date().toISOString(),
            ...newFavorite,
        });

        const snapshot = await favoriteCenoteDB.doc(docRef.id).get();
        console.log(snapshot)
        return snapshot.data() as FavoriteCenotes;
    }
  
    
}


