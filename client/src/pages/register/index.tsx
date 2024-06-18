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
import GradientDiv from '@/components/GradientDiv'

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
  const [inputFocus, setInputFocus] = useState<boolean>(false)

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
    const res = await fetch(
      `/${process.env.NEXT_PUBLIC_ASSET_PREFIX}/api/user/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      },
    )

    const data = await res.json()

    if (!data?.success && data?.error?.code === 11000) {
      //  duplicate key error code from MongoDB
      console.log(data)

      setLoading(false)
      toast({
        title: `Seems like this e-mail is already in use`,
        status: 'warning',
        position: 'top',
        isClosable: false,
      })
      return
    }

    setLoading(false)
    toast({
      title: `Account created successfully, you may login now`,
      status: 'success',
      position: 'top',
      isClosable: false,
    })

    router.push('login')
  }

  return (
    <GradientDiv className="bg-stone-900 w-screen h-screen flex justify-center content-center">
      <section className="w-full h-screen flex align-middle justify-center">
        <Center>
          <Card
            maxW="md"
            className={`md:mx-0 mx-4 transition ${
              inputFocus ? 'scale-110' : ''
            }`}
            style={{
              borderRadius: '3px',
            }}
          >
            <CardHeader>
              <h1 className="text-stone-900 text-4xl font-heading">
                Create a new account
              </h1>
            </CardHeader>
            <CardBody>
              <Input
                placeholder="First name "
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
                onFocus={() => setInputFocus(() => true)}
                onBlur={() => setInputFocus(() => false)}
              />

              <Input
                placeholder="Last name "
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
                onFocus={() => setInputFocus(() => true)}
                onBlur={() => setInputFocus(() => false)}
              />

              <Input
                placeholder="Email "
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
                onFocus={() => setInputFocus(() => true)}
                onBlur={() => setInputFocus(() => false)}
              />

              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={show ? 'text' : 'password'}
                  placeholder="Password"
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
                  onFocus={() => setInputFocus(() => true)}
                  onBlur={() => setInputFocus(() => false)}
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
                style={{
                  borderRadius: '3px',
                }}
              >
                Register
              </Button>
            </CardFooter>
          </Card>
        </Center>
      </section>
    </GradientDiv>
  )
}
