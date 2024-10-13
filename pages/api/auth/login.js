import prisma from "../../../app/lib/prisma";
import bcrypt from 'bcryptjs';


export default async function handler(req,res) {
    try {

        if (req.method !== 'POST') {
            return res.status(405).json({ message: 'Yalnızca POST isteği kabul edilmektedir.' });
        }

         const {email, password} = req.body
         
         if (!email, !password) {
             return res.status(400).json({message: 'E-posta ve şifre alanları boş bırakılamaz!'})
         }

         const user = await prisma.user.findUnique({
            where: {
                email: email,
            }
         })

         if (!user) {
            return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
        }


        const validPassword = await bcrypt.compare(password, user.password)

        if (!validPassword) {
             return res.status(401).json({status:-1, message:'Geçersiz Şifre'})
        }
        
        return res.status(200).json({ message: 'Giriş başarılı.', user });

    } catch (error) {
        console.error('Hata:', error);
        return res.status(500).json({ message: 'Sunucu hatası.' });

    }
    
}