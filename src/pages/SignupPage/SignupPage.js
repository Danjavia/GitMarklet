/**
 * External Resources
 **/
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Button from 'antd/lib/button';

/**
 * constants
 * */
const FormItem = Form.Item;

/**
 * Internal Resources
 **/
import App from '../../components/App/App';
import './SignupPage.css';

/**
 * SignupPage class definition
 **/
class SignupPage extends Component {

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
        <div className="signup-page">
          <nav>
            <h2><Link to="/">GitMarklet</Link></h2>
          </nav>

          <div className="signup-page__form">
            <Form>
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
                  <Button type="primary" htmlType="submit" size="large" icon="user">Registrarme</Button>
                  <Link to="/login" style={{marginLeft: 10}}>Acceder</Link>
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
 * SignupPageForm
 * @const  createForm()(SignupPage);  just created form component
 **/
const SignupPageForm = Form.create()(SignupPage);

export default SignupPageForm;
