export interface FRAplotData {
  id: number;
  pathD: string;
  pattaHolder: string;
  developmentPriority: 'High' | 'Medium' | 'Low';
  eligibleSchemes: string[];
  area: number;
  lat?: number;
  lng?: number;
}

export type UserRole = 'user' | 'gov';

export interface AuthContextType {
  isLoggedIn: boolean;
  role: UserRole | null;
  login: (role: UserRole) => void;
  logout: () => void;
}

// New types for Document Intelligence feature

export interface DocumentData {
  document_type: string | null;
  date_issued: string | null;
  place_of_execution: string | null;
  stamp_details: {
    value: string | null;
    serial_number: string | null;
    state: string | null;
  };
  lessor: {
    name: string | null;
    father_name: string | null;
    address: string | null;
  } | null;
  lessee: {
    name: string | null;
    father_name: string | null;
    address: string | null;
  } | null;
  notary_info: Record<string, any> | null;
  signatures_present: "yes" | "no" | null;
  raw_excerpt: string | null;
  _llm_raw_output_preview?: string;
}

export interface ProcessedRecord {
  file_name: string;
  structured_data: DocumentData;
  error?: string;
}

// New types for Community Browser feature
export interface CommunityMember {
  id: number;
  name: string;
  age: number;
  fatherName: string;
  plotId: number; // Links to a plot in FRA_PLOT_DATA
}

export interface TribalCommunity {
  name: string;
  description: string;
  members: CommunityMember[];
}

// New types for Chatbot
export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}