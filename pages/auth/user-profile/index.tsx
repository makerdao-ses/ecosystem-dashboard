import React from 'react';
import { getSSRPropsDefaultAuth } from '../../../src/core/utils/commonGetSSRProps';
import UserProfileContainer from '../../../src/stories/containers/Users/UserProfile/UserProfileContainer';
import type { NextPage } from 'next';

const UserProfilePage: NextPage = () => <UserProfileContainer />;

export default UserProfilePage;

export const getServerSideProps = getSSRPropsDefaultAuth;
