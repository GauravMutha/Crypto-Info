import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {server} from '../index';
import { Container, HStack ,Button, RadioGroup, Radio} from '@chakra-ui/react';
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';
import CoinCard from './CoinCard';


const Coins = () => {
  const [coinsArr,setCoinsArr]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(false);
  const [currency,setCurrency]=useState('inr');
  const [page,setPage]=useState(1);
  
  const btns=new Array(101).fill(1);

  const changePage=(page)=>{
      setPage(page);
      setLoading(true);
  }

  const currencySymbol=currency==='inr'?'₹':currency==='eur'?'€':'$';
  
  useEffect(() => {
    const fetchCoins=async()=>{
      try {
        const {data}=await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
        setCoinsArr(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    }
    fetchCoins ();
  }, [currency,page])

  if(error){
    return <ErrorComponent message={'Server error in fetching the data'}/>
  }

  return (
    <Container maxWidth={'container.xl'}>
    {loading ?<Loader></Loader>:
    <>
    <RadioGroup value={currency} onChange={setCurrency} p={'8'}>
      <HStack spacing={'4'}>
        <Radio value='inr'>INR</Radio>
        <Radio value='eur'>EUR</Radio>
        <Radio value='usd'>USD</Radio>
      </HStack>
    </RadioGroup>
      <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
        {coinsArr.map((i)=>{

          return <CoinCard
            id={i.id}
            key={i.id}
            name={i.name}
            price={i.current_price}
            img={i.image}
            symbol={i.symbol}
            currencySymbol={currencySymbol}
          />

        })}
      </HStack>

      <HStack width={'full'} p={'4'} overflowX={'auto'}>
        {
          btns.map((item,index)=>(
            <Button 
            key={index}
            bgColor={'blackAlpha.900'} 
            color={'white'} 
            onClick={()=>changePage(index+1)}
            >
            {index+1}
            </Button>
          ))
        }
      </HStack>
    </>
    }
    </Container>
  )
}


export default Coins