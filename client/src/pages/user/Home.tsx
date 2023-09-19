import React from 'react'
import Layout from '../../components/user/Layout'
import MainNews from '../../components/user/home/MainNews'
import NewsDetails from '../../components/user/home/NewsDetails'
import Opinions from '../../components/user/home/Opinions'
import Videos from '../../components/user/home/Videos'

export default function Home() {
    return (
        <Layout color={true}>
            <MainNews/>
            <NewsDetails/>
            <Opinions/>
            <Videos/>
        </Layout>
    )
}