import Container from '../Container/Container.tsx';
import { AuthForm} from './AuthForm.tsx';
import { LoginHeader } from './LoginHeader.tsx';


export const Login = () => {

    return <>
    <Container>
      <LoginHeader />
      <AuthForm />
    </Container>
    </>
}
