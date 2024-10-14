"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button"; 
import { notification, Spin } from 'antd';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"; 
import { Input } from "../ui/input";
import { useLoginMutation } from '../../../services/authApi';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  email: z.string().email({
    message: "Geçersiz e-posta adresi.",
  }),
  password: z.string().min(6, {
    message: "Şifre en az 6 karakter olmalıdır.",
  }),
});

export function LoginForm() {
  const router = useRouter(); 
  const [login, { isLoading, error }] = useLoginMutation();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const result = await login(data).unwrap();
      notification.success({
        message: 'Giriş Başarılı',
        placement: 'top',
      });
      
      if (result.status === 1) {
        router.push('/'); 
      }
      console.log('Kullanıcı başarıyla kaydedildi:', result);
    } catch (err) {
      notification.error({
        message: 'Giriş Hatası',
        description: error?.data?.message || 'Giriş sırasında bir hata oluştu.',
        placement: 'top',
      });
      console.error('Kayıt hatası:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-posta</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Şifre</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {isLoading ? (
          <div className="flex justify-center">
            <Spin />
          </div>
        ) : (
          <Button type="submit" disabled={isLoading}>
            Giriş Yap
          </Button>
        )}
      </form>
    </Form>
  );
}
