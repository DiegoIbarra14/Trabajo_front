
import {  
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInUser } from "../../Redux/authSlice";
import { InputText } from 'primereact/inputtext';
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import "../../Styles/Login/Login.css"
// import { signInUser } from "Redux/authSlice";
import LoginService from "Services/LoginService";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({
     name: "",
     password: "",
  });
  const handleChangeUsuario = (e) => {
    setUsuario((prevState) => ({
       ...prevState,
       name: e.target.value,
    }));
 };

 const handleChangePassword = (e) => {
    setUsuario((prevState) => ({
       ...prevState,
       password: e.target.value,
    }));
 };


  const handleSubmit = () => {
    dispatch(signInUser(usuario));
    console.log("entro login");
    LoginService.login(usuario)
       .then((response) => {
          // handleToast("success", "Usuario correcto", "Bienvenido");
          console.log("meee", response.data);
          LoginService.setToken(response.data.token);
          console.log(response?.data?.accesos);
          let url = "/" + response?.data?.accesos[0]?.url;
          console.log(url);
          navigate(url);
       })
       .catch((error) => {
          console.log(error)
          // showToast(
          //    "error",
          //    "Error al ingresar",
          //    error.response.data.error
          // );
       });
 };

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent ">
            <div className="text-muted text-center mt-2 mb-3">
              <p className="fontLogin text-xl font-weight-bold">Iniciar Sesión</p>
            </div>       
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-3">
              <small className="fontCredencial">Ingresa tus credenciales</small>
            </div>
            {/* <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                      
                    </InputGroupText>
                    <InputText className=" ml-3 w-100"/>
                  </InputGroupAddon>
                 
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                  />
                </InputGroup>
              </FormGroup>
              
              <div className="text-center">
                <Button className="my-4" color="primary" type="button">
                  Sign in
                </Button>
              </div>
            </Form> */}
            <div className="contenedorinp">
              <div className="field">
                <label htmlFor="Usuario" className="Usuariooo fontUsuario">Usuario</label>
                <InputText 
                id="username1" 
                aria-describedby="username1-help" 
                placeholder="Nombre de usuario" 
                className="InputTextUsuarioLogin" 
                value={usuario?.name}
                onChange={handleChangeUsuario}
                //onKeyDown={handlePasswordKeyDown}
                />
                
              </div>
              <div className="field password ">
                <label htmlFor="Password" className="Contraaa fontPassword">Contraseña</label>
                <Password 
                toggleMask 
                className="w-100 InputTextContraLogin"
                placeholder="Contraseña"
                feedback={false}
                value={usuario?.password} 
                onChange={handleChangePassword}
                style={{width:"400px!important"}}
                //onKeyDown={handlePasswordKeyDown}
                id="password"/>
              </div>
              <div className="login-button">
                <Button
                label="Ingresar" 
                className="p-button-rounded fontButton" 
                onClick={handleSubmit}
                id="login-button"
                // disabled={isLoginDisabled}
                />
              </div>{/* Mostrar mensajes de error aquí */}
            </div>
          </CardBody>
        </Card>
       
      </Col>
    </>
  );
};

export default Login;
