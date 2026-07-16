import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
} from 'react';

export type Proof = {
  id: number;
  title: string;
  project: string;
  category: string;
  description: string;
  tags: string[];
  hours: number;
  minutes: number;
  createdAt: string;
};

export type AddProofInput = {
  title: string;
  project: string;
  category: string;
  description: string;
  tags: string[];
  hours: number;
  minutes: number;
};

type ProofContextType = {
  proofs: Proof[];
  addProof: (proof: AddProofInput) => void;
};

const ProofContext = createContext<
  ProofContextType | undefined
>(undefined);

const initialProofs: Proof[] = [
  {
    id: 1,
    title: 'Built authentication flow',
    project: 'ProofOfWork',
    category: 'Project Work',
    description: 'Completed login and signup flow',
    tags: ['React Native', 'Expo'],
    hours: 2,
    minutes: 30,
    createdAt: '09:00 AM',
  },
  {
    id: 2,
    title: 'Solved 3 DSA problems',
    project: 'DSA Practice',
    category: 'DSA',
    description: 'Solved array and two pointer problems',
    tags: ['Arrays', 'C++'],
    hours: 1,
    minutes: 15,
    createdAt: '11:30 AM',
  },
  {
    id: 3,
    title: 'Learned FastAPI routing',
    project: 'Backend Learning',
    category: 'Learning',
    description: 'Completed API routing basics',
    tags: ['FastAPI', 'Python'],
    hours: 2,
    minutes: 0,
    createdAt: '06:30 PM',
  },
];

export function ProofProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [proofs, setProofs] =
    useState<Proof[]>(initialProofs);

  const addProof = (proof: AddProofInput) => {
    const newProof: Proof = {
      id: Date.now(),
      ...proof,
      createdAt: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setProofs((currentProofs) => [
      newProof,
      ...currentProofs,
    ]);
  };

  return (
    <ProofContext.Provider
      value={{
        proofs,
        addProof,
      }}
    >
      {children}
    </ProofContext.Provider>
  );
}

export function useProofs() {
  const context = useContext(ProofContext);

  if (!context) {
    throw new Error(
      'useProofs must be used inside ProofProvider'
    );
  }

  return context;
}