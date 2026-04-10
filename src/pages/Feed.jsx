import { useEffect, useState } from 'react';
import { FiUsers, FiMapPin, FiAward, FiSearch, FiUserPlus, FiCopy, FiCheck, FiPlus, FiCoffee } from 'react-icons/fi';
import axios from 'axios';
import CheckinCard from '../components/ui/CheckinCard';

export default function Feed() {
  const [checkins, setCheckins] = useState([]);
  const [friendCheckins, setFriendCheckins] = useState([]);
  const [filter, setFilter] = useState('friends');
  
  // Friends tab state
  const [friends, setFriends] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [copiedFriend, setCopiedFriend] = useState(false);
  const [inviteCode] = useState('OVERPOURD123');

  // Groups tab state
  const [groups, setGroups] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [copiedGroup, setCopiedGroup] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '' });

  // Fetch friends, users, and friend checkins
  useEffect(() => {
    const fetchData = async () => {
      try {
        const friendsRes = await axios.get('http://localhost:3000/friends');
        const usersRes = await axios.get('http://localhost:3000/users');
        const checkinsRes = await axios.get('http://localhost:3000/checkins');
        
        setFriends(friendsRes.data);
        setUsers(usersRes.data);
        
        // Filter checkins from accepted friends only
        const acceptedFriendIds = friendsRes.data
          .filter(f => f.status === 'accepted' && f.userId === 1)
          .map(f => f.friendId);
        
        const filteredCheckins = checkinsRes.data.filter(c => 
          acceptedFriendIds.includes(c.userId)
        ).sort((a, b) => new Date(b.date + ' ' + b.time) - new Date(a.date + ' ' + a.time));
        
        setFriendCheckins(filteredCheckins);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    if (filter === 'friends') fetchData();
  }, [filter]);

  // Fetch groups
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const groupsRes = await axios.get('http://localhost:3000/groups');
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
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
    } else {
      setCopiedGroup(true);
      setTimeout(() => setCopiedGroup(false), 2000);
    }
  };

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    const newGroup = {
      name: formData.name,
      description: formData.description,
      createdBy: 1,
      members: [1],
      inviteCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
      createdDate: new Date().toISOString().split('T')[0],
    };
    try {
      await axios.post('http://localhost:3000/groups', newGroup);
      setFormData({ name: '', description: '' });
      setShowCreateModal(false);
      const res = await axios.get('http://localhost:3000/groups');
      setGroups(res.data);
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  const handleJoinGroup = (groupId) => {
    console.log('Join group:', groupId);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center px-0 py-0 pb-20">
      <div className="fixed top-16 left-0 right-0 w-full flex gap-0 z-40 bg-white border-b">
        <button
          onClick={() => setFilter('friends')}
          className={`flex-1 px-4 py-2 rounded-none font-semibold transition flex flex-col items-center gap-1 ${
            filter === 'friends'
              ? 'bg-coffee text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <FiUsers size={20} />
          <span className="text-xs">Friends</span>
        </button>
        <button
          onClick={() => setFilter('nearby')}
          className={`flex-1 px-4 py-2 rounded-none font-semibold transition flex flex-col items-center gap-1 ${
            filter === 'nearby'
              ? 'bg-coffee text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <FiMapPin size={20} />
          <span className="text-xs">Nearby</span>
        </button>
        <button
          onClick={() => setFilter('groups')}
          className={`flex-1 px-4 py-2 rounded-none font-semibold transition flex flex-col items-center gap-1 ${
            filter === 'groups'
              ? 'bg-coffee text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <FiAward size={20} />
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
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="font-semibold text-sm">{user.name}</p>
                          <p className="text-xs text-gray-500">@{user.username}</p>
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
                    const user = users.find(u => u.id === checkin.userId);
                    return user ? (
                      <div
                        key={checkin.id}
                        className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition"
                      >
                        {/* User Info */}
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="w-10 h-10 rounded-full"
                            />
                            <div>
                              <p className="font-semibold text-sm">{user.name}</p>
                              <p className="text-xs text-gray-500">@{user.username}</p>
                            </div>
                          </div>
                          <span className="text-xs text-gray-400">
                            {new Date(checkin.date).toLocaleDateString()}
                          </span>
                        </div>

                        {/* Check-in Details */}
                        <div className="bg-gradient-to-br from-coffee/5 to-orange-50 p-3 rounded-lg mb-2">
                          <div className="flex items-center gap-2 mb-2">
                            <FiCoffee size={20} className="text-coffee" />
                            <span className="font-bold text-lg">{checkin.drink}</span>
                          </div>
                          <div className="space-y-1 text-sm">
                            <p className="text-gray-700">
                              <span className="font-semibold">☕ Cafe:</span> {checkin.cafe}
                            </p>
                            <p className="text-gray-600 flex items-center gap-1">
                              <FiMapPin size={14} />
                              {checkin.location}
                            </p>
                          </div>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((mugIndex) => (
                              <div key={mugIndex} className="relative">
                                {/* Background mug (empty) */}
                                <FiCoffee size={24} className="text-gray-300" />
                                
                                {/* Filled overlay */}
                                {checkin.rating >= mugIndex ? (
                                  <FiCoffee
                                    size={24}
                                    className="text-coffee absolute top-0 left-0"
                                  />
                                ) : checkin.rating === mugIndex - 0.5 ? (
                                  <div className="absolute top-0 left-0 overflow-hidden w-3">
                                    <FiCoffee size={24} className="text-coffee" />
                                  </div>
                                ) : null}
                              </div>
                            ))}
                          </div>
                          <span className="text-sm font-semibold text-coffee">
                            {checkin.rating}/5
                          </span>
                        </div>

                        {/* Review */}
                        {checkin.review && (
                          <p className="text-sm text-gray-600 italic">"{checkin.review}"</p>
                        )}
                      </div>
                    ) : null;
                  })}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No activity from friends yet!</p>
              )}
            </div>
          </div>
        )}

        {/* Nearby Tab Content */}
        {filter === 'nearby' && (
          <div className="text-center py-12">
            <p className="text-gray-500">Nearby content coming soon...</p>
          </div>
        )}

        {/* Groups Tab Content */}
        {filter === 'groups' && (
          <div className="space-y-4">
            {/* Create Group Button */}
            <button
              onClick={() => setShowCreateModal(true)}
              className="w-full flex items-center justify-center gap-2 bg-coffee text-white px-4 py-3 rounded-lg hover:opacity-90 transition font-semibold"
            >
              <FiPlus size={18} />
              Create Group
            </button>

            {/* Create Group Modal */}
            {showCreateModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg p-6 max-w-md w-full">
                  <h2 className="text-xl font-bold mb-4">Create Group</h2>
                  <form onSubmit={handleCreateGroup} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Group Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Description
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({ ...formData, description: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee"
                        rows="3"
                      />
                    </div>
                    <div className="flex gap-2 pt-4">
                      <button
                        type="button"
                        onClick={() => setShowCreateModal(false)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 px-4 py-2 bg-coffee text-white rounded-lg hover:opacity-90 transition"
                      >
                        Create
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Groups List */}
            {groups.length > 0 ? (
              <div className="space-y-3">
                {groups.map((group) => (
                  <div
                    key={group.id}
                    className="border border-gray-200 rounded-lg p-4 bg-white"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-lg">{group.name}</h3>
                        <p className="text-sm text-gray-600">{group.description}</p>
                      </div>
                    </div>

                    {/* Members */}
                    <div className="flex items-center gap-2 my-3">
                      <FiUsers size={16} className="text-gray-600" />
                      <span className="text-sm text-gray-600">
                        {group.members ? group.members.length : 0} members
                      </span>
                    </div>

                    {/* Member Avatars */}
                    {group.members && group.members.length > 0 && (
                      <div className="flex -space-x-2 mb-3">
                        {group.members.map((memberId) => {
                          const member = users.find((u) => u.id === memberId);
                          return member ? (
                            <img
                              key={memberId}
                              src={member.avatar}
                              alt={member.name}
                              className="w-8 h-8 rounded-full border-2 border-white"
                              title={member.name}
                            />
                          ) : null;
                        })}
                      </div>
                    )}

                    {/* Invite/Join Button */}
                    <button
                      onClick={() => {
                        setSelectedGroup(group);
                        setShowInviteModal(true);
                      }}
                      className="w-full bg-coffee text-white px-3 py-2 rounded-lg hover:opacity-90 transition text-sm font-semibold"
                    >
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No groups yet. Create one to get started!</p>
              </div>
            )}

            {/* Invite/Join Modal */}
            {showInviteModal && selectedGroup && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg p-6 max-w-md w-full">
                  <h2 className="text-xl font-bold mb-4">{selectedGroup.name}</h2>
                  <p className="text-gray-600 mb-4">{selectedGroup.description}</p>

                  <div className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-200">
                    <p className="text-xs text-gray-600 mb-2">Invite Code:</p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 bg-white px-3 py-2 rounded text-sm font-mono border border-gray-200">
                        {selectedGroup.inviteCode}
                      </code>
                      <button
                        onClick={() => copyToClipboard(selectedGroup.inviteCode, 'group')}
                        className="bg-coffee text-white p-2 rounded hover:opacity-90 transition"
                      >
                        {copiedGroup ? (
                          <FiCheck size={18} />
                        ) : (
                          <FiCopy size={18} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowInviteModal(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => {
                        handleJoinGroup(selectedGroup.id);
                        setShowInviteModal(false);
                      }}
                      className="flex-1 px-4 py-2 bg-coffee text-white rounded-lg hover:opacity-90 transition"
                    >
                      Join Group
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
