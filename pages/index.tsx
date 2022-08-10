import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { CuTable } from '../src/stories/containers/cu-table/cu-table';

const CuTablePage:NextPage = () => {
  return (
    <>
    <Head>
      <title></title>
    </Head>
    <CuTable />
    </>
  );
};

export default CuTablePage;
