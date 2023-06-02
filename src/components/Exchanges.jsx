import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {server} from '../index';
import { Container, HStack } from '@chakra-ui/react';
import Loader from './Loader';
import ExchangeCard from './ExchangeCard';
import ErrorComponent from './ErrorComponent';


const Exchanges = () => {
  const [exchangesArr,setExchangesArr]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(false);
  useEffect(() => {
    const fetchExchanges=async()=>{
      try {
        const response=await axios.get(`${server}/exchanges`);
        const data = response.data;
        setExchangesArr(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    }
    fetchExchanges();
  }, [])

  if(error) return <ErrorComponent message={'Server error in fetching the data'}/>

  return (
    <Container maxWidth={'container.xl'}>
    {loading ?<Loader></Loader>:
    <>
      <HStack wrap={'wrap'} justify-content='space-evenly'>
        {exchangesArr.map((i)=>{

          return <ExchangeCard
            key={i.id}
            name={i.name}
            img={i.image}
            rank={i.trust_score_rank}
            url={i.url}
          />

        })}
      </HStack>
    </>
    }
    </Container>
  )
}

export default Exchanges;