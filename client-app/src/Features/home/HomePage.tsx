import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Container, Header, Segment, Image, Button} from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import LoginForm from "../users/LoginForm";

export default observer( function HomePage() {
  const {userStore,modalStore}=useStore();
  return (
<Segment inverted textAlign='center' vertical className='masthead'>
  <Container text>
    <Header as='h1' inverted>
      <Image size='massive' src='assets/logo2.png' alt='logo' style={{marginBottom:12, width:150}}/>
    </Header>
    {userStore.isLoggedIn ? (
      <>
          <Header as='h2' inverted content='ברוכים הבאים!'/>
          <Button as={Link} to='/activities' size='huge' inverted>
            Go to Activities!
          </Button>
      </>
    ):(
      <>
      <Button onClick={()=>modalStore.openModal(<LoginForm/>)} size='huge' inverted>
      התחבר/י
    </Button>
    </>
    )}
  </Container>

</Segment>
  );
})
