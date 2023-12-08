import React from 'react'
import {
  Box,
  Heading,
  List,
  ListItem,
  Link,
  Divider,
  Text,
  Center,
} from '@chakra-ui/react'

function ContactUs() {
  return (
    <Box
      p="4"
      backgroundColor="black"
      color="white"
      minHeight="100vh" // Ensures the content takes at least the full viewport height
      display="flex"
      flexDirection="column"
    >
      <Box flex="1">
        {' '}
        {/* This Box will hold the main content */}
        <Heading as="h1" mb="4">
          Contact Us
        </Heading>
        <Box>
          <Heading as="h2" size="md" mb="2">
            Our Team - Feel free to drop us a mail if you come across a bug or
            want a feature added
          </Heading>
          <List styleType="none" ml="0" mb="4" mt="5">
            <ListItem mt={5}>
              <strong>Govind</strong>:{' '}
              <Link href="mailto:mudavadkar.g@northeastern.edu">
                mudavadkar.g@northeastern.edu
              </Link>
            </ListItem>
            <ListItem mt={5}>
              <strong>Atharva</strong>:{' '}
              <Link href="mailto:kamble.ath@northeastern.edu">
                kamble.ath@northeastern.edu
              </Link>
            </ListItem>
            <ListItem mt={5}>
              <strong>Gaurav</strong>:{' '}
              <Link href="mailto:sinha.g@northeastern.edu">
                sinha.g@northeastern.edu
              </Link>
            </ListItem>
          </List>
        </Box>
      </Box>
      <footer>
        <Text textAlign="center">
          &copy; 2023 Present-A better way to present. All rights reserved.
        </Text>
      </footer>
    </Box>
  )
}

export default ContactUs
