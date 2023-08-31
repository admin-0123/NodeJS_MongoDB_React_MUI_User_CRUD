import Head from 'next/head';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import UserTable from "@/components/UserTable";
import { getUserData } from '@/store/results.action';

export default function Home() {
  const dispatch = useDispatch();
  const { payload: userData } = useSelector((store: any) => store.results);

  useEffect(() => {
    dispatch(getUserData());
  }, []);

  return (
    <>
      <Head>
        <title>Assessment</title>
      </Head>
      <main className="flex flex-col items-center">
        {
          !userData ?
            <CircularProgress size={72} className="m-8" />
            : (
              <>
                <h1 className="font-bold text-5xl text-center pt-12">USER DATA</h1>
                <UserTable data={userData.result} />
              </>
            )
        }
      </main>
    </>
  )
}
