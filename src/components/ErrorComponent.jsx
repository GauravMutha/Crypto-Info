import React from 'react'
import { Alert } from '@chakra-ui/react'
const ErrorComponent = ({message}) => {
  return (
    <Alert
    status='error'
    position={'fixed'}
    bottom={'4'}
    left={'50%'}
    transform={'translateX(-50%)'}
    w={'container.lg'}
    >
      {message}
    </Alert>
  )
}

export default ErrorComponent