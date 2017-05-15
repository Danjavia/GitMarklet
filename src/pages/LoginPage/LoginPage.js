/**
 * External Resources
 **/
import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Button from 'antd/lib/button';
import notification from 'antd/lib/notification';
import StorageManager from '../../services/StorageManager';

/**
 * constants
 * */
const FormItem = Form.Item;

/**
 * Internal Resources
 **/
import App from '../../components/App/App';
import './LoginPage.css';

/**
 * LoginPage class definition
 **/
class LoginPage extends Component {

  /**
   * handleSubmit
   * Send data to server
   * */
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.props);
    const {mutate} = this.props;

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return;
      }

      const variables = {
        ...values
      };

      mutate({variables}).then(({data}) => {

        StorageManager.update('access_token', data.signinUser.token);
        StorageManager.update('uid', data.signinUser.user.id);
        this.props.history.push('/favorites');

      }).catch((err) => {
        notification['error']({
          message: 'Check fields again',
          description: 'No user found with that information',
        });
      });
    });
  }

  /**
   * render
   * @return {ReactElement} markup
   * */
  render() {

    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: { span: 24 },
      wrapperCol: { span: 23 },
    };

    return (
      <App>
        <div className="login-page">
          <nav>
            <h2><Link to="/">GitMarklet</Link></h2>
          </nav>

          <div className="login-page__form">
            <Form layout="vertical" onSubmit={this.handleSubmit.bind(this)}>
              <h2>GitMarklet :: Easy Access</h2>
              <Row>
                <Col>
                  <FormItem
                    {...formItemLayout}
                    label="Email"
                  >
                    {getFieldDecorator('email', {
                      initialValue: '',
                      rules: [{
                        required: true,
                        message: 'Este campo no puede estar vacio.'
                      }, {
                        type: 'email',
                        message: 'Ingresa un email válido'
                      }]
                    })(
                      <Input />
                    )}
                  </FormItem>
                </Col>
              </Row>

              <Row>
                <Col>
                  <FormItem
                    {...formItemLayout}
                    label="Password"
                  >
                    {getFieldDecorator('password', {
                      initialValue: '',
                      rules: [{
                        required: true,
                        message: 'Este campo no puede estar vacio.'
                      }]
                    })(
                      <Input type="password" />
                    )}
                  </FormItem>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Button type="primary" htmlType="submit" size="large" icon="unlock">Entrar</Button>
                  <Link to="/signup" style={{marginLeft: 10}}>Crear cuenta</Link>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </App>
    );
  }
}

/**
 * LoginPageForm
 * @const  createForm()(LoginPage);  just created form component
 **/
const LoginPageForm = Form.create()(LoginPage);

export default withRouter(LoginPageForm);
