import { useAuth } from '../../context/AuthContext';
import { User } from 'lucide-react';

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
      <p className="text-gray-400 mt-1">Your account details</p>

      <div className="bg-white border border-gray-100 rounded-2xl p-8 mt-8 max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500 flex items-center justify-center mb-5">
          <User className="w-8 h-8 text-white" />
        </div>
        <p className="text-xs font-semibold tracking-wide text-gray-400 uppercase">Name</p>
        <p className="text-lg font-semibold text-gray-900 mt-1">{user?.name}</p>

        <p className="text-xs font-semibold tracking-wide text-gray-400 uppercase mt-6">Email</p>
        <p className="text-lg font-semibold text-gray-900 mt-1">{user?.email}</p>
      </div>
    </div>
  );
};

export default ProfilePage;