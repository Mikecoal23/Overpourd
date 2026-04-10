import { useEffect, useState } from 'react';
import axios from 'axios';
import { FiSearch, FiUserPlus, FiCopy, FiCheck } from 'react-icons/fi';

export default function Friends() {
  const [friends, setFriends] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  const inviteCode = 'OVERPOURD123';

  useEffect(() => {
    fetchFriends();
    fetchUsers();
  }, []);

  const fetchFriends = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/friends`);
      setFriends(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching friends:', error);
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setShowSearchResults(query.length > 0);
  };

  const searchResults = users.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const friendIds = friends
    .filter((f) => f.status === 'accepted')
    .map((f) => f.friendId);

  const friendUsers = users.filter((u) => friendIds.includes(u.id));

  const handleAddFriend = (userId) => {
    console.log('Adding friend:', userId);
    setSearchQuery('');
    setShowSearchResults(false);
  };

  const handleCopyInvite = () => {
    navigator.clipboard.writeText(inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading friends...</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center px-4 py-4 pb-20">
      <div className="max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-coffee mb-6">Friends</h1>

        {/* Search Section */}
        <div className="mb-8 relative">
          <div className="relative">
            <FiSearch className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search friends by name or username"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-lg"
            />
          </div>

          {/* Search Results */}
          {showSearchResults && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              {searchResults.length > 0 ? (
                <div className="max-h-60 overflow-y-auto">
                  {searchResults.map((user) => (
                    <div
                      key={user.id}
                      className="p-3 border-b flex items-center justify-between hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="font-semibold">{user.name}</p>
                          <p className="text-sm text-gray-600">@{user.username}</p>
                        </div>
                      </div>
                      {!friendIds.includes(user.id) && (
                        <button
                          onClick={() => handleAddFriend(user.id)}
                          className="flex items-center gap-2 px-3 py-1 bg-coffee text-white rounded-lg hover:bg-opacity-90 transition text-sm"
                        >
                          <FiUserPlus size={16} />
                          Add
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-gray-500 text-center">No users found</div>
              )}
            </div>
          )}
        </div>

        {/* Invite Link Section */}
        <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 mb-8">
          <p className="font-semibold text-coffee mb-3">Share Your Invite Code</p>
          <div className="flex gap-2">
            <div className="flex-1 bg-white border border-gray-300 rounded px-3 py-2 font-mono text-lg font-bold text-center">
              {inviteCode}
            </div>
            <button
              onClick={handleCopyInvite}
              className="flex items-center gap-2 px-4 py-2 bg-coffee text-white rounded-lg hover:bg-opacity-90 transition"
            >
              {copied ? (
                <>
                  <FiCheck size={18} />
                  Copied!
                </>
              ) : (
                <>
                  <FiCopy size={18} />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>

        {/* Friends List */}
        <div>
          <h2 className="text-2xl font-bold text-coffee mb-4">
            Your Friends ({friendUsers.length})
          </h2>
          {friendUsers.length > 0 ? (
            <div className="space-y-3">
              {friendUsers.map((friend) => (
                <div
                  key={friend.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:shadow-md transition"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={friend.avatar}
                      alt={friend.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p className="font-semibold text-lg">{friend.name}</p>
                      <p className="text-sm text-gray-600">@{friend.username}</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition text-sm font-semibold">
                    View Profile
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">You don't have any friends yet!</p>
              <p className="text-sm text-gray-400">
                Search for users above or share your invite code
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
