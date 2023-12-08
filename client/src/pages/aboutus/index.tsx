import React from 'react'
import { Box, Heading, Image, Text } from '@chakra-ui/react'
import { StaticImageData } from 'next/image'
import userImage from '../../assets/download.jpg'
import LandingInfo from '@/components/Landing-info'

interface TeamMemberProps {
  name: string
  imgSrc: StaticImageData
  altText: string
  description: string
}

const TeamMember: React.FC<TeamMemberProps> = ({
  name,
  imgSrc,
  altText,
  description,
}) => (
  <Box
    className="team-member"
    marginBottom="20px"
    border="1px solid #ccc"
    padding="10px"
    overflow="hidden"
  >
    <Image
      src={imgSrc.src}
      alt={altText}
      boxSize="100px"
      borderRadius="full"
      marginRight="10px"
    />
    <Box>
      <Heading as="h2" size="md" marginBottom="5px">
        {name}
      </Heading>
      <Text>{description}</Text>
    </Box>
  </Box>
)

function AboutUs() {
  const teamMembers: TeamMemberProps[] = [
    {
      name: 'Govind M',
      imgSrc: userImage,
      altText: 'Govind',
      description:
        'Govind is an enthusiastic member of our team, dedicated to delivering excellence in every project.',
    },
    {
      name: 'Atharv K',
      imgSrc: userImage,
      altText: 'Atharv',
      description:
        'Atharv is passionate about creativity and innovation, striving to achieve the best results.',
    },
    {
      name: 'Gaurav S',
      imgSrc: userImage,
      altText: 'Gaurav',
      description:
        'Gaurav brings a wealth of experience, ensuring smooth operations and successful outcomes.',
    },
  ]

  return (
    <section className="w-full h-screen bg-stone-900 text-stone-300">
      <meta charSet="UTF-8" />
      <title>About Us</title>
      <Heading as="h1" size="xl" marginBottom="20px" className="text-center">
        About Us
      </Heading>
      <LandingInfo />
      {/* <Box className="team-members">
          {teamMembers.map((member, index) => (
            <TeamMember
              key={index}
              name={member.name}
              imgSrc={member.imgSrc}
              altText={member.altText}
              description={member.description}
            />
          ))}
        </Box> */}
      <footer style={{ position: 'fixed', bottom: '0' }}>
        <Text>&copy; 2023 YourCompanyName. All rights reserved.</Text>
      </footer>
    </section>
  )
}

export default AboutUs
