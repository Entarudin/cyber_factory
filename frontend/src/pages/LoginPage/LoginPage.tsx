import React, { FC, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useInput, } from 'hooks'
import { axiosAuthLogin } from 'store/auth/actions'

const LoginPage: FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [email, onChangeEmail] = useInput<HTMLInputElement>('')
  const [password, onChangePassword] = useInput<HTMLInputElement>('')

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault()
    dispatch(axiosAuthLogin({ email, password }))
      .then(() => navigate(-1))
      .catch((err: any) => console.log(err))
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Вход</h2>
        <div>
          <input 
            type='email' 
            placeholder={'Почта'} 
            value={email} 
            onChange={onChangeEmail} 
          />
        </div>
        <div>
          <input
            type='password'
            placeholder={'Пароль'}
            value={password}
            onChange={onChangePassword}
          />
        </div>
        <a>Забыли пароль?</a>
        <button> Войти</button>
      </form>
    </div>
  )
}

export { LoginPage  }
