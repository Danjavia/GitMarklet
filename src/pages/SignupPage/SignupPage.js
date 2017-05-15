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
import './SignupPage.css';

/**
 * SignupPage class definition
 **/
class SignupPage extends Component {

  /**
   * handleSubmit
   * Send data to server
   * */
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.props);
    const {createUser, signinUser} = this.props;

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return;
      }

      const variables = {
        ...values
      };

      createUser({variables}).then(({data}) => {
        delete variables.username;

        signinUser({variables}).then(({data}) => {
          StorageManager.update('access_token', data.signinUser.token);
          StorageManager.update('uid', data.signinUser.user.id);
          this.props.history.push('/favorites');
        });

      }).catch((err) => {
        notification['error']({
          message: 'Check fields again',
          description: 'User already exists with that information',
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

    console.log(this.props);

    return (
      <App>
        <div className="signup-page">
          <nav>
            <h2><Link to="/">GitMarklet</Link></h2>
          </nav>

          <div className="signup-page__form">
            <Form layout="vertical" onSubmit={this.handleSubmit.bind(this)}>
              <h2>GitMarklet :: Early Access</h2>
              <Row>
                <Col>
                  <FormItem
                    {...formItemLayout}
                    label="Username"
                  >
                    {getFieldDecorator('username', {
                      initialValue: '',
                      rules: [{
                        required: true,
                        message: 'This field cannot be empty.'
                      }]
                    })(
                      <Input placeholder="Username" />
                    )}
                  </FormItem>
                </Col>
              </Row>

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
                        message: 'This field cannot be empty.'
                      }, {
                        type: 'email',
                        message: 'Insert a valid email'
                      }]
                    })(
                      <Input placeholder="set an email" />
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
                        message: 'This field cannot be empty.'
                      }]
                    })(
                      <Input type="password" placeholder="set your password" />
                    )}
                  </FormItem>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Button type="primary" htmlType="submit" size="large" icon="rocket">Registrarme</Button>
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

export default withRouter(SignupPageForm);
