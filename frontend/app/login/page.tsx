import { authenticateUser } from "./authenticate";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
    return <LoginForm loginAction={authenticateUser}/>;
}
