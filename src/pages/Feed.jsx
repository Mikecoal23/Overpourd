import { useEffect, useState } from 'react';
import { FiUsers, FiMapPin, FiAward, FiSearch, FiUserPlus, FiCopy, FiCheck, FiCoffee } from 'react-icons/fi';
import axios from 'axios';

export default function Feed() {
  const [checkins, setCheckins] = useState([]);
  const [friendCheckins, setFriendCheckins] = useState([]);
  const [filter, setFilter] = useState('friends');
  const [loading, setLoading] = useState(true);

  // Friends tab state
  const [friends, setFriends] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [copiedFriend, setCopiedFriend] = useState(false);
  const [inviteCode] = useState('OVERPOURD123');

  // Groups tab state
  const [groups, setGroups] = useState([]);

  // Fetch friends, users, and friend checkins
  useEffect(() => {
    const fetchData = async () => {
      try {
        const friendsRes = await axios.get(`${import.meta.env.VITE_API_URL}/friends`);
        const usersRes = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
        const checkinsRes = await axios.get(`${import.meta.env.VITE_API_URL}/checkins`);

        setFriends(friendsRes.data);
        setUsers(usersRes.data);

        // Filter checkins from accepted friends only
        const acceptedFriendIds = friendsRes.data
          .filter(f => f.status === 'accepted' && f.userId === 1)
          .map(f => f.friendId);

        // Find users that are friends
        const friendUsers = usersRes.data.filter(u => acceptedFriendIds.includes(u.id));
        const friendUserNames = friendUsers.map(u => u.name);

        const filteredCheckins = checkinsRes.data.filter(c =>
          friendUserNames.includes(c.user)
        ).sort((a, b) => new Date(b.date + ' ' + (b.time || '00:00')) - new Date(a.date + ' ' + (a.time || '00:00')));

        setFriendCheckins(filteredCheckins);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    if (filter === 'friends') fetchData();
  }, [filter]);

  // Fetch groups
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const groupsRes = await axios.get(`${import.meta.env.VITE_API_URL}/groups`);
        setGroups(groupsRes.data);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };
    if (filter === 'groups') fetchGroups();
  }, [filter]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setShowSearchResults(query.length > 0);
  };

  const searchResults = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddFriend = (userId) => {
    console.log('Add friend:', userId);
    setSearchQuery('');
    setShowSearchResults(false);
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'friend') {
      setCopiedFriend(true);
      setTimeout(() => setCopiedFriend(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading activity...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center px-0 py-0 pb-20">
      <div className="fixed top-16 left-0 right-0 w-full flex gap-0 z-40 bg-white border-b">
        <button
          onClick={() => setFilter('friends')}
          className={`flex-1 px-4 py-2 rounded-none font-semibold transition flex flex-col items-center gap-1 ${
            filter === 'friends'
              ? 'bg-cream text-coffee'
              : 'bg-cream-soft text-coffee hover:bg-cream'
          }`}
        >
          <span className={`p-2 rounded-full transition ${filter === 'friends' ? 'bg-sage text-cream' : 'bg-cream text-coffee'}`}>
            <FiUsers size={20} />
          </span>
          <span className="text-xs">Friends</span>
        </button>
        <button
          onClick={() => setFilter('nearby')}
          className={`flex-1 px-4 py-2 rounded-none font-semibold transition flex flex-col items-center gap-1 ${
            filter === 'nearby'
              ? 'bg-cream text-coffee'
              : 'bg-cream-soft text-coffee hover:bg-cream'
          }`}
        >
          <span className={`p-2 rounded-full transition ${filter === 'nearby' ? 'bg-sage text-cream' : 'bg-cream text-coffee'}`}>
            <FiMapPin size={20} />
          </span>
          <span className="text-xs">Nearby</span>
        </button>
        <button
          onClick={() => setFilter('groups')}
          className={`flex-1 px-4 py-2 rounded-none font-semibold transition flex flex-col items-center gap-1 ${
            filter === 'groups'
              ? 'bg-cream text-coffee'
              : 'bg-cream-soft text-coffee hover:bg-cream'
          }`}
        >
          <span className={`p-2 rounded-full transition ${filter === 'groups' ? 'bg-sage text-cream' : 'bg-cream text-coffee'}`}>
            <FiAward size={20} />
          </span>
          <span className="text-xs">Groups</span>
        </button>
      </div>

      <div className="w-full px-4 max-w-2xl mt-28">
        {/* Friends Tab Content */}
        {filter === 'friends' && (
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
                <FiSearch size={18} className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-sm"
                />
              </div>

              {/* Search Results */}
              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                  {searchResults.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-3 border-b last:border-b-0"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-coffee text-white flex items-center justify-center font-semibold">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.bio}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleAddFriend(user.id)}
                        className="flex items-center gap-1 bg-coffee text-white px-3 py-1 rounded-lg hover:opacity-90 text-sm"
                      >
                        <FiUserPlus size={14} />
                        Add
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Invite Code */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-xs text-gray-600 mb-2">Your invite code:</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-white px-3 py-2 rounded text-sm font-mono border border-gray-200">
                  {inviteCode}
                </code>
                <button
                  onClick={() => copyToClipboard(inviteCode, 'friend')}
                  className="bg-coffee text-white p-2 rounded hover:opacity-90 transition"
                >
                  {copiedFriend ? (
                    <FiCheck size={18} />
                  ) : (
                    <FiCopy size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Friends Activity Feed */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <FiCoffee size={18} />
                What Your Friends Are Drinking
              </h3>
              {friendCheckins.length > 0 ? (
                <div className="space-y-3">
                  {friendCheckins.map((checkin) => {
                    const user = users.find(u => u.name === checkin.user);
                    return user ? (
                      <div
                        key={checkin.id || checkin._id}
                        className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition"
                      >
                        {/* User Info */}
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-coffee text-white flex items-center justify-center font-semibold">
                              {user.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-semibold">{checkin.user}</p>
                              <p className="text-sm text-gray-600">{checkin.cafe}</p>
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">{checkin.date}</span>
                        </div>
                        <p className="text-gray-700">{checkin.drink}</p>
                      </div>
                    ) : null;
                  })}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No friend checkins yet. Start exploring cafes!</p>
              )}
            </div>
          </div>
        )}

        {/* Nearby Tab Content */}
        {filter === 'nearby' && (
          <div className="space-y-4">
            <h3 className="font-semibold mb-3">Nearby Checkins</h3>
            <p className="text-gray-500 text-center py-8">Nearby feature coming soon!</p>
          </div>
        )}

        {/* Groups Tab Content */}
        {filter === 'groups' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Your Groups</h3>
              <p className="text-gray-500 text-sm">Groups feature coming soon!</p>
            </div>
            {groups.length > 0 ? (
              <div className="space-y-3">
                {groups.map((group) => (
                  <div key={group.id || group._id} className="border border-gray-200 rounded-lg p-4 bg-white">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold">{group.name}</h4>
                        <p className="text-sm text-gray-600">{group.description}</p>
                      </div>
                      <span className="text-xs text-gray-500">{group.createdDate}</span>
                    </div>
                    <p className="text-gray-500 text-center py-4">Group features coming soon!</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No groups yet. Groups feature coming soon!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
