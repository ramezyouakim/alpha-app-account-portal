"use client"
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(()=>{
    router.replace("/delete/init")
  },[])

  return (
    <h1>Alpha App</h1>
  )
}
