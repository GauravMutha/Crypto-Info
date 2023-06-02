import { Box, Container, HStack, Radio, RadioGroup, VStack, Text, Image, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Badge, Progress ,Button} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { server } from '../index'
import ErrorComponent from './ErrorComponent';
import Chart  from './Chart.jsx';

const btns=['24h','7d','14d','30d','60d','200d','1y','max'];

const CoinDetails = () => {
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState('inr');
  const [days, setDays] = useState('24h');
  const [chartArray, setChartArray] = useState([]);
  const params = useParams();

  const currencySymbol = currency === 'inr' ? '₹' : currency === 'eur' ? '€' : '$';
  const switchChartStats=(key)=>{
    switch (key) {
      case '24h':
        setDays('24h');
        setLoading(true);
        break;
      case '7d':
        setDays('7d');
        setLoading(true);
        break;
      case '14d':
        setDays('14d');
        setLoading(true);
        break;
      case '30d':
        setDays('30d');
        setLoading(true);
        break;
      case '60d':
        setDays('60d');
        setLoading(true);
        break;
      case '200d':
        setDays('200d');
        setLoading(true);
        break;
      case '1y':
        setDays('365d');
        setLoading(true);
        break;
      case 'max':
        setDays('max');
        setLoading(true);
        break;
    
      default:
        setDays('24h');
        setLoading(true);
        break;
    }
  }
  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const {data} = await axios.get(`${server}/coins/${params.id}`);
        const {data:chartData} = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`);
        setCoin(data);
        setChartArray(chartData.prices);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    }
    fetchCoin();
  }, [params.id , currency,days])
  if (error) {
    return <ErrorComponent message={'Server error in fetching the data'} />
  }
  return (
    <Container maxW={'container.xl'}>
      {loading ? <Loader /> :
        <>
          <Box width={'full'} borderWidth={1}>
            <Chart arr={chartArray} currency={currencySymbol} days={days}></Chart>
          </Box>
          <HStack p={'4'} overflowX={'auto'}>
            {
              btns.map((i)=>
                <Button key={i} onClick={()=>switchChartStats(i)}>{i}</Button>
              )
            }
          </HStack>
          <RadioGroup value={currency} onChange={setCurrency} p={'8'}>
            <HStack spacing={'4'}>
              <Radio value='inr'>INR</Radio>
              <Radio value='eur'>EUR</Radio>
              <Radio value='usd'>USD</Radio>
            </HStack>
          </RadioGroup>

          <VStack p={'4'} spacing={'4'} alignItems={'flex-start'}>
            <Text fontSize={'small'} alignSelf={'center'} opacity={'0.7'}>
              Last updated on  {Date(coin.market_data.last_updated).split("G")[0]}
            </Text>
            <Image src={coin.image.large} w={'16'} h={'16'} objectFit={'contain'}></Image>
            <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>{currencySymbol}{coin.market_data.current_price[currency]}</StatNumber>
              <StatHelpText>
                <StatArrow
                  type={coin.market_data.price_change_percentage_24h > 0 ? "increase" : "decrease"}
                />
                {coin.market_data.price_change_percentage_24h}%
              </StatHelpText>
            </Stat>
            <Badge fontSize={'2xl'} bgColor={'blackAlpha.800'} color={'white'}>
              {`#${coin.market_cap_rank}`}
            </Badge>
            <CustomBar high={`${currencySymbol}${coin.market_data.high_24h[currency]}`} low={`${coin.market_data.low_24h[currency]}`} />

            <Box p='4' w={'full'}>
              <Item title={'Max Supply'} value={coin.market_data.max_supply}></Item>
              <Item title={'Circulating Supply'} value={coin.market_data.circulating_supply}></Item>
              <Item title={'Market Cap'} value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}></Item>
              <Item title={'All Time Low'} value={`${currencySymbol}${coin.market_data.atl[currency]}`}></Item>
              <Item title={'Market Cap'} value={`${currencySymbol}${coin.market_data.ath[currency]}`}></Item>
            </Box>
          </VStack>
        </>
      }
    </Container>
  )
}

const Item = ({ title, value }) => (
  <HStack justifyContent={'space-between'} w={'full'} my={'4'}>
    <Text fontFamily={'Bebas Neue'} letterSpacing={'widest'}>{title}</Text>
    <Text>{value}</Text>
  </HStack>
)

const CustomBar = ({ high, low }) => (
  <VStack w={'full'} >
    <Progress w={'full'} colorScheme={'teal'} value={50} />
    <HStack justifyContent={'space-between'} w={'full'}>
      <Badge colorScheme='red' children={low} />
      <Text fontSize={'sm'}>24H Range</Text>
      <Badge colorScheme='green' children={high} />
    </HStack>
  </VStack>
)

export default CoinDetails