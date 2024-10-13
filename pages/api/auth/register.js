import bcrypt from 'bcryptjs';
import prisma from '../../../app/lib/prisma'
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password, username } = req.body;

    if (!username) {
      return res.status(400).json({ message: 'Kullanıcı adı (username) gerekli' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          username, 
        },
      });

      return res.status(200).json({ message: 'Kullanıcı başarıyla oluşturuldu', user: newUser });
    } catch (error) {
      return res.status(500).json({ message: 'Kullanıcı oluşturulurken bir hata oluştu', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(404).json({ message: `Method ${req.method} Not Allowed` });
  }
}
