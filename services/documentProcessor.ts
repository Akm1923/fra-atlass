import type { DocumentData, ProcessedRecord } from '../types';

// This function simulates a call to a backend AI service (like the one described in the user's Python script).
// It takes a file, waits for a bit, and returns a structured JSON object.
export const processDocument = (file: File): Promise<DocumentData> => {
  return new Promise((resolve, reject) => {
    // Simulate network and AI processing time (e.g., 2-4 seconds)
    const delay = Math.random() * 2000 + 2000;

    setTimeout(() => {
      // Simulate a potential error for certain file names
      if (file.name.toLowerCase().includes('error')) {
        reject(new Error('AI model could not read the document. It might be corrupted or illegible.'));
        return;
      }
      
      // Based on the file name, return different mock data to show variation.
      let mockData: DocumentData;

      if (file.name.toLowerCase().includes('rent')) {
        mockData = {
          document_type: "Rent Agreement",
          date_issued: "15th day of June, 2023",
          place_of_execution: "Ranchi, Jharkhand",
          stamp_details: {
            value: "1000",
            serial_number: "IN-JH12345678901234X",
            state: "Jharkhand"
          },
          lessor: {
            name: "Soma Kerkar",
            father_name: "Ghanshyam Kerkar",
            address: "123 Forest Lane, Village Tutui, Ranchi"
          },
          lessee: {
            name: "Mangal Singh",
            father_name: "Birsa Singh",
            address: "456 River Side, Village Guttu, Ranchi"
          },
          notary_info: { date: '15-06-2023', stamp_text: 'Notarized by S.K. Verma' },
          signatures_present: "yes",
          raw_excerpt: "This Rent Agreement is made and executed at Ranchi on this 15th day of June, 2023 between Soma Kerkar (Lessor) and Mangal Singh (Lessee)..."
        };
      } else {
         mockData = {
          document_type: "Land Patta (Sale Deed)",
          date_issued: "2nd day of January, 2024",
          place_of_execution: "Khunti, Jharkhand",
          stamp_details: {
            value: "500",
            serial_number: "AT 312424",
            state: "Jharkhand"
          },
          lessor: {
            name: "Laxman Murmu",
            father_name: "Jethu Murmu",
            address: "Adivasi Colony, Khunti"
          },
          lessee: {
            name: "Budhni Devi",
            father_name: "Sukru Asur",
            address: "Village Tiril, Khunti"
          },
          notary_info: null,
          signatures_present: "yes",
          raw_excerpt: "This Deed of Absolute Sale is made and executed on this 2nd day of January 2024 by Sri Laxman Murmu S/o Jethu Murmu hereinafter called the VENDOR..."
        };
      }
      
      resolve(mockData);

    }, delay);
  });
};

// Provides a set of initial records for the government dashboard to have data on load.
export const getInitialRecords = (): ProcessedRecord[] => {
    return [
        {
            file_name: "patta_document_01.pdf",
            structured_data: {
              document_type: "Land Patta",
              date_issued: "10th day of March, 2022",
              place_of_execution: "Gumla, Jharkhand",
              stamp_details: { value: "500", serial_number: "JH-GUM88726", state: "Jharkhand" },
              lessor: { name: "Phulmani Munda", father_name: "Ratan Gond", address: "Village Basa, Gumla" },
              lessee: { name: "Birsa Oram", father_name: "Santosh Lohra", address: "Village Kurum, Gumla" },
              notary_info: null,
              signatures_present: "yes",
              raw_excerpt: "This land patta recognizes the rights of Birsa Oram over the designated forest land area as per the Forest Rights Act, 2006..."
            }
        },
        {
            file_name: "registry_scan_final.jpeg",
            structured_data: {
              document_type: "Sale Deed",
              date_issued: "21st day of November, 2021",
              place_of_execution: "Jamshedpur, Jharkhand",
              stamp_details: { value: "2000", serial_number: "JH-JAM55198", state: "Jharkhand" },
              lessor: { name: "Sumitra Tudu", father_name: "Gomati Bai", address: "Sakchi, Jamshedpur" },
              lessee: { name: "Rameshwar Singh", father_name: "Arjun Munda", address: "Mango, Jamshedpur" },
              notary_info: { date: '21-11-2021', stamp_text: 'Registered at Sub-Registrar Office' },
              signatures_present: "yes",
              raw_excerpt: "This sale deed is executed... evidencing the transfer of property from the vendor, Sumitra Tudu, to the purchaser, Rameshwar Singh..."
            }
        },
         {
            file_name: "claim_application_03.png",
            structured_data: {
              document_type: "Affidavit",
              date_issued: "5th day of February, 2023",
              place_of_execution: "Daltonganj, Jharkhand",
              stamp_details: { value: "100", serial_number: "JH-DLT01982", state: "Jharkhand" },
              lessor: null, // Not applicable for affidavit
              lessee: { name: "Anita Kacchap", father_name: "Karan Pahan", address: "Medininagar, Daltonganj" },
              notary_info: { date: '05-02-2023', stamp_text: 'Attested by Notary Public' },
              signatures_present: "yes",
              raw_excerpt: "I, Anita Kacchap, do hereby solemnly affirm and declare as under: That I am the deponent herein and a resident of the above mentioned address..."
            }
        }
    ];
};
