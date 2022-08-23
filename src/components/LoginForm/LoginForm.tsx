import React, { useContext, useState } from 'react'
import {Form, Input, Button, Card} from 'antd';
import style from './LoginForm.module.scss';
import { StoreContext } from '../../store.context';
import { observer } from 'mobx-react-lite'

const LoginForm = () => {
    const [username, setUsername] = useState<string> ('');
    const [password, setPassword] = useState<string> ('');

    const {authStore} = useContext (StoreContext);
    const isError = authStore.error;
    // console.log (isEror)
    const submit = () => {
        authStore.login(username, password);
    }
    
  return (
    <div className={style.wrapForm}>
        <Card>
            <Form
                onFinish={submit}
            >
                {isError && <div className={style.newError}>{isError}</div>}
                <Form.Item
                    label="Имя пользователя"
                    name="username"
                    rules={[{ required: true, message: 'Пожалуйста введите имя пользователя' }]}
                >
                    <Input onChange={e => setUsername(e.target.value)} value={username}/>
                </Form.Item>

                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[{ required: true, message: 'Пожалуйста введите пароль' }]}
                >
                    <Input.Password onChange={e => setPassword(e.target.value)} value={password} />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={authStore.isLoading}>
                        Войти
                    </Button>
                </Form.Item>

            </Form>
        </Card>
    </div>
  )
}

export default observer(LoginForm); 