import React from 'react';
import { getSSRPropsDefaultAuth } from '../../../src/core/utils/common-get-ssr-props';
import UserProfileContainer from '../../../src/stories/containers/users/user-profile/user-profile-container';
import type { NextPage } from 'next';

const UserProfilePage: NextPage = () => <UserProfileContainer />;

export default UserProfilePage;

export const getServerSideProps = getSSRPropsDefaultAuth;
