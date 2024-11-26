"use client";
import React from 'react';
import { useParams } from 'next/navigation';

const Page = () => {
  const { query } = useParams();
  
  const decodedQuery = query ? decodeURIComponent(Array.isArray(query) ? query.join('') : query) : '';

  return (
    <div>
      <p>Decoded Query: {decodedQuery}</p>
    </div>
  );
};

export default Page;
