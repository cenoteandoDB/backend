import csv
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

COLLECTION_NAME="references"
cred = credentials.Certificate("../../functions/credentials/cenoteando.json")
firebase_admin.initialize_app(cred)
db = firestore.client()


columns_to_drop = ["Mentioned_Sinkhole_Cenote","Mentioned_Species","Remarks", "uploaded_database", "Unique_Cenote_Code", "Unique_Sp_Code"]

ref_types = {"Journal": "JOURNAL", 
             "Reporte": "REPORT", 
             "Capitulo de libro": "BOOK_CHAPTER",
             "Capitulo de Libro": "BOOK_CHAPTER",
             "Tesis": "THESIS",
             "Libro": "BOOK",
             "Pagina Web": "WEB_PAGE",
             "Otro": "OTHER"}

def process_to_list(value: str):
    if value is None:
        return []
    else:
        return [x.strip() for x in value.split(";")]    


def process_boolean(value: str):
    return True if value is not None and value == "1" else False

def stripValue(value: str):
    return value.strip() if value is not None else None


def process_and_insert(data, count):
    reference = {}
    
    for key, value in data.items():
        if value == '':
            data[key] = None

    reference["cenoteando_id"] = int(data["No."])
    reference["type"] = ref_types[data["Type"]]
    reference["unique_code"] = int(data["Unique_Code"])
    reference["title"] = stripValue(data["Title"])
    reference["short_name"] = stripValue(data["Short_Name"])
    reference["date_primary"] = int(data["Date_Primary"]) if data["Date_Primary"] is not None else None
    reference["authors"] = process_to_list(data["Author_or_Creator"])
    reference["journal_name"] = stripValue(data["Journal_Name"])
    reference["issue"] = stripValue(data["ISSUE"])
    reference["institution"] = stripValue(data["Institution"])
    reference["date_secondary"] = int(data["Date_Secundary"]) if data["Date_Secundary"] is not None else None
    reference["book"] = stripValue(data["Book"])
    reference["secondary_authors"] = process_to_list(data["Author_or_Creator_Secundary"])
    reference["publisher"] = stripValue(data["Publisher"])
    reference["pages"] = stripValue(data["Pages"])
    reference["doi"] = stripValue(data["DOI"])
    reference["url"] = stripValue(data["URL"])
    reference["keywords"] = process_to_list(data["KeyWords"])
    reference["has_pdf"] = process_boolean(data["PDF"])
    reference["pdf_name"] = stripValue(data["PDF_Name"])
    reference["mendeley_ref"] = process_boolean(data["Reference_Mendeley"])
    reference["uploaded_mendeley"] = process_boolean(data["PDF_Uploaded_Mendeley"])
    reference["validated_mendeley"] = process_boolean(data["Validated_Citation_Mendeley"])
    reference["uploaded_dropbox"] = process_boolean(data["PDF_Uploaded_DropBox"])
    reference["uploaded_gcp"] = process_boolean(data["PDF_Uploaded_GoogleCloud"])
    reference["cenotes_count"] = len(data["Unique_Cenote_Code"].split(",")) if data["Mentioned_Sinkhole_Cenote"] != "0" else 0
    reference["species_count"] = len(data["Unique_Sp_Code"].split(",")) if data["Mentioned_Species"] != "0" else 0

    doc_ref = db.collection(COLLECTION_NAME).document()
    reference["firestore_id"] = doc_ref.id
    doc_ref.set(reference)


# Read CSV file and process each line
with open('confirmed-references.csv', newline='', encoding='utf-8-sig') as csvfile: 
    reader = csv.DictReader(csvfile, delimiter=";")
    count = 0
    for row in reader:
        process_and_insert(row, count)
        count += 1
    