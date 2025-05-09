import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { Factory } from 'lucide-react';
import Button from '../../components/ui/Button';
import TextField from '../../components/ui/TextField';

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginPage = () => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>();
  
  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await login(data.email, data.password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary-600 text-white mb-4">
            <Factory size={32} />
          </div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            DomDom
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Food Production Management System
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="Email"
                type="email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                error={errors.email?.message}
              />

              <TextField
                label="Password"
                type="password"
                {...register('password', { 
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
                error={errors.password?.message}
              />
              
              {error && (
                <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
                  {error}
                </div>
              )}

              <div>
                <Button
                  type="submit"
                  fullWidth
                  isLoading={isLoading}
                >
                  Sign in
                </Button>
              </div>

              <div className="text-center text-sm">
                <p className="text-gray-500">Demo Credentials</p>
                <div className="mt-1 grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="font-medium">Admin</p>
                    <p>admin@domdom.com</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="font-medium">Manager</p>
                    <p>manager@domdom.com</p>
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-400">
                  Use "password" for all demo accounts
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;