import store from 'store2'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useState } from 'react'

interface TLoginFormData {
  email: string
  password: string
}

export default function Login() {
  const router = useRouter()
  const toast = useToast()
  // const { setUserId } = useLocalStorage()

  const [show, setShow] = useState(false)
  const [formData, setFormData] = useState<TLoginFormData>({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState<boolean>(false)

  const SERVER_DOMAIN =
    process.env.NEXT_PUBLIC_API_URL || `http://localhost:3000`
  async function handleLogin() {
    // Validation start
    if (!/^\S+@\S+\.\S+$/.test(formData?.email)) {
      toast({
        title: 'Please enter a valid email',
        status: 'error',
        position: 'top',
        isClosable: false,
      })
      return
    }
    if (formData?.email.length === 0 || formData?.password.length === 0) {
      toast({
        title: 'Please enter all details',
        status: 'error',
        position: 'top',
        isClosable: false,
      })
      return
    }
    // Validation end

    setLoading(true)
    const res = await fetch(`api/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    const data = await res.json()

    setLoading(false)

    if (data?.error) {
      if (data?.error.toLowerCase() === 'user_not_exist') {
        toast({
          title: 'User does not exist',
          status: 'error',
          position: 'top',
          isClosable: false,
        })
      } else if (data?.error.toLowerCase() === 'password_not_match') {
        toast({
          title: 'Incorrect password',
          status: 'error',
          position: 'top',
          isClosable: false,
        })
      }
      return
    }
    // add user to localstorage

    store('user_id', data?.body?._id)
    store('user_name', data?.body?.firstName)
    toast({
      title: `Welcome back, ${data?.body?.firstName}`,
      status: 'success',
      position: 'top',
      isClosable: false,
    })

    router.push('/home')
  }

  return (
    <section className="w-full h-screen flex align-middle justify-center bg-stone-900">
      <Center>
        <Card maxW="md" className="md:mx-0 mx-4">
          <CardHeader>
            <Heading className="text-stone-900">Welcome back</Heading>
          </CardHeader>
          <CardBody>
            <Text>Email</Text>
            <Input
              placeholder="Enter your email"
              className="mt-1"
              size="md"
              value={formData?.email}
              onChange={(e) =>
                setFormData((prev) => {
                  return {
                    ...prev,
                    email: e.target.value,
                  }
                })
              }
            />
            <Text className="mt-10">Password</Text>

            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={show ? 'text' : 'password'}
                placeholder="Enter password"
                className="mt-1"
                value={formData?.password}
                onChange={(e) =>
                  setFormData((prev) => {
                    return {
                      ...prev,
                      password: e.target.value,
                    }
                  })
                }
              />
              <InputRightElement width="4.5rem" className="mt-1">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={() => setShow((prev) => !prev)}
                >
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
          </CardBody>
          <CardFooter>
            <Button
              _hover={{ color: '#EAEAEA', backgroundColor: '#373737' }}
              backgroundColor="#1C1C1C"
              color="#EAEAEA"
              onClick={() => handleLogin()}
              isLoading={loading}
            >
              Login
            </Button>
          </CardFooter>
        </Card>
      </Center>
    </section>
  )
}
