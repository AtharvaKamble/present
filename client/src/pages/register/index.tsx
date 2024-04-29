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
import '../register/index.css'

interface TLoginFormData {
  firstName: string
  lastName: string
  email: string
  password: string
}

export default function Register() {
  const router = useRouter()
  const toast = useToast()
  // const { setUserId } = useLocalStorage()

  const [show, setShow] = useState(false)
  const [formData, setFormData] = useState<TLoginFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState<boolean>(false)

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
    if (
      formData?.firstName.length === 0 ||
      formData?.lastName.length === 0 ||
      formData?.email.length === 0 ||
      formData?.password.length === 0
    ) {
      toast({
        title: 'Please enter all details',
        status: 'error',
        position: 'top',
        isClosable: false,
      })
      return
    }
    if (formData?.password.length < 7) {
      toast({
        title: 'Password cannot be less than 7 characters',
        status: 'error',
        position: 'top',
        isClosable: false,
      })
      return
    }
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        formData?.password,
      )
    ) {
      const msg =
        'Invalid password. Please follow these rules:\n' +
        '- At least 8 characters\n' +
        '- At least one uppercase letter\n' +
        '- At least one lowercase letter\n' +
        '- At least one digit\n' +
        '- At least one special character (@$!%*?&)'
      toast({
        title: msg,
        status: 'error',
        position: 'top',
        isClosable: true,
      })
      return
    }
    // Validation end

    setLoading(true)
    const res = await fetch(`/api/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    const data = await res.json()

    setLoading(false)
    await toast({
      title: `Account created successfully, you may login now`,
      status: 'success',
      position: 'top',
      isClosable: false,
    })

    router.push('/login')
  }

  return (
    <section className="w-full h-screen flex align-middle justify-center bg-stone-900">
      <Center>
        <Card maxW="md" className="md:mx-0 mx-4">
          <CardHeader>
            <Heading
              className="text-stone-900"
              display="flex"
              justifyContent="center"
            >
              Register Here
            </Heading>
          </CardHeader>
          <CardBody>
            <Text>First Name*</Text>
            <Input
              placeholder="Enter your first name"
              className="mt-1 input-styling"
              size="md"
              value={formData?.firstName}
              onChange={(e) =>
                setFormData((prev) => {
                  return {
                    ...prev,
                    firstName: e.target.value,
                  }
                })
              }
            />

            <Text>Last Name*</Text>
            <Input
              placeholder="Enter your last name"
              className="mt-1 input-styling"
              size="md"
              value={formData?.lastName}
              onChange={(e) =>
                setFormData((prev) => {
                  return {
                    ...prev,
                    lastName: e.target.value,
                  }
                })
              }
            />

            <Text>Email*</Text>
            <Input
              placeholder="Enter your email"
              className="mt-1 input-styling"
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
            <Text className="">Password*</Text>

            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={show ? 'text' : 'password'}
                placeholder="Enter password"
                className="mt-1 input-styling"
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
          <CardFooter display="flex" justifyContent="center">
            <Button
              _hover={{ color: '#EAEAEA', backgroundColor: '#373737' }}
              backgroundColor="#1C1C1C"
              color="#EAEAEA"
              onClick={() => handleLogin()}
              isLoading={loading}
            >
              Register
            </Button>
          </CardFooter>
        </Card>
      </Center>
    </section>
  )
}
