import React from 'react';
import { message, Modal, Button, Form, Input, Menu } from 'antd';
import { LoginOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

class Login extends React.Component {

    constructor() {
        super();
    
        this.state = {
          loading: false,
        };   
      }

    layout = {
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 16,
        },
      };
      tailLayout = {
        wrapperCol: {
          offset: 8,
          span: 16,
        },
      };

      onLogin = (values) => {
        console.log('Success:', values);
  
        var form = new FormData();
        form.append('login', values.username);
        form.append('password', values.password);
        fetch('http://site.alwaysdata.net/login.php', {
          method: 'POST',
          body: form,
        }).then(res => res.json())
          .then(respons => {
            if(respons.token != null){
              console.log(respons);
              localStorage.setItem("token", respons.token);
              localStorage.setItem("name", respons.name);
              localStorage.setItem("icon", respons.icon);
              this.handleOk();
              message.success('Успех!');
              window.location.reload();
            }else{
              message.error('Не правильный логин или пароль!');
            }
          })
        };


        onRegister = (values) => {
          console.log('Success:', values);
    
          var form = new FormData();
          form.append('login', values.username);
          form.append('password', values.password);
          form.append('name', values.name);
          fetch('http://site.alwaysdata.net/register.php', {
            method: 'POST',
            body: form,
          })
          message.success('Успех!');
        };
    
    onFinishFailed = (errorInfo) => {console.log('Failed:', errorInfo);};
  
    showModal = () => {this.setState({visible: true,});};
    showModalreg = () => {this.setState({visible2: true,});};
  
    handleOk = () => {this.setState({ loading: true });setTimeout(() => {this.setState({ loading: false, visible: false,  visible2: false });}, 3000);};
  
    handleCancel = e => {this.setState({ visible: false,  visible2: false});};

    render(){
        const { visible, loading } = this.state;

        return(
            <div>
              <Button type="link" className="reg" onClick={this.showModalreg}>Регистрация</Button>
                <Button type="primary" className="auth" onClick={this.showModal} icon={<LoginOutlined />}>Войти</Button>

                <Modal
                title="Авторизация"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={[]}
              >

                <Form
                  {...this.layout}
                  name="Логин"
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={this.onLogin}
                  onFinishFailed={this.onFinishFailed}
                >
                  <Form.Item label="Логин" name="username"
                    rules={[{
                        required: true,
                        message: 'Пожалуйста введите логин!',
                      },]}>
                    <Input />
                  </Form.Item>

                  <Form.Item label="Пароль" name="password"
                    rules={[{
                        required: true,
                        message: 'Пожалуйства введите пароль!',
                      },]}>
                    <Input.Password />
                  </Form.Item>

                  <Form.Item {...this.tailLayout}>

                    <Button htmlType="button" onClick={this.handleCancel}>Назад</Button>
                    <Button type="primary" htmlType="submit" loading={loading} onClick={this.handleOk}>Войти</Button>

                  </Form.Item>
                </Form>

              </Modal>

              <Modal
                title="Регистрация"
                visible={this.state.visible2}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={[]}
              >

                <Form
                  {...this.layout}
                  name="Логин"
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={this.onRegister}
                  onFinishFailed={this.onFinishFailed}
                >
                  <Form.Item label="Логин" name="username"
                    rules={[{
                        required: true,
                        message: 'Поле обязательное!',
                      },]}>
                    <Input />
                  </Form.Item>

                  <Form.Item label="Пароль" name="password"
                    rules={[{
                        required: true,
                        message: 'Поле обязательное!',
                      },]}>
                    <Input.Password />
                  </Form.Item>

                  <Form.Item label="Имя" name="name"
                    rules={[{
                        required: true,
                        message: 'Поле обязательное!',
                      },]}>
                    <Input />
                  </Form.Item>

                  <Form.Item {...this.tailLayout}>

                    <Button htmlType="button" onClick={this.handleCancel}>Назад</Button>
                    <Button type="primary" htmlType="submit" loading={loading} onClick={this.handleOk}>Отправить</Button>

                  </Form.Item>
                </Form>

              </Modal>
            </div>
        );
    }
}

export default Login