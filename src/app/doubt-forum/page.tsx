'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DoubtModal from '@/components/DoubtModal'
import { Separator } from "@/components/ui/separator"
import DoubtCard from '@/components/DoubtCard'

const Page = () => {
  const [doubts, setDoubts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all doubts
  const fetchDoubts = async () => {
    try {
      const response = await axios.get('/api/doubt/postDoubt');
      if (response.status === 200) {
        setDoubts(response.data.doubts);
      }
    } catch (err) {
      console.error('Error fetching doubts:', err);
      setError('Failed to fetch doubts');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDoubts();
  }, []);

  console.log('@@@@@@@@@2',doubts);

  return (
    <div className='container mx-auto border-2 border-white rounded-md mt-12 p-4 flex flex-col gap-6'>
      <div className='flex items-center justify-between px-2'>
        <h1 className='text-2xl font-bold'>Adpatix Doubt Forum</h1>
        <DoubtModal />
      </div>
      <Separator />
      <div className="space-y-4">
        {isLoading ? (
          <p>Loading doubts...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          doubts.map((doubt) => (
            <DoubtCard key={doubt.id} doubt={doubt} />
          ))
        )}
      </div>
    </div>
  );
};

export default Page;
