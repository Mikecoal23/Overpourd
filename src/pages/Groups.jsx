import { useEffect, useState } from 'react';
import axios from 'axios';
import { FiPlus, FiUsers, FiCopy, FiCheck } from 'react-icons/fi';

export default function Groups() {
  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(null);
  const [copiedCode, setCopiedCode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    fetchGroups();
    fetchUsers();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/groups`);
      setGroups(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching groups:', error);
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

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const newGroup = {
      name: formData.name,
      description: formData.description,
      createdBy: 1,
      members: [1],
      inviteCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
      createdDate: new Date().toISOString().split('T')[0],
    };

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/groups`, newGroup);
      fetchGroups();
      setFormData({ name: '', description: '' });
      setShowCreateModal(false);
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  const handleCopyInviteCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getGroupMembers = (memberIds) => {
    return memberIds
      .map((id) => users.find((u) => u.id === id))
      .filter(Boolean);
  };

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading groups...</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center px-4 py-4 pb-20">
      <div className="max-w-2xl w-full">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-coffee">Groups</h1>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-coffee text-white rounded-lg hover:bg-opacity-90 transition"
          >
            <FiPlus size={20} />
            Create Group
          </button>
        </div>

        {/* Create Group Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4 text-coffee">Create New Group</h2>
              <form onSubmit={handleCreateGroup} className="space-y-4">
                <input
                  type="text"
                  placeholder="Group name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
                <textarea
                  placeholder="Group description (optional)"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2 resize-none h-24"
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-coffee text-white rounded hover:bg-opacity-90 transition font-semibold"
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
          <div className="space-y-4">
            {groups.map((group) => {
              const members = getGroupMembers(group.members);
              return (
                <div
                  key={group.id}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-coffee mb-2">
                        {group.name}
                      </h3>
                      <p className="text-gray-700 mb-2">{group.description}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FiUsers size={16} />
                        <span>{group.members.length} members</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowInviteModal(group.id)}
                      className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 transition text-sm font-semibold"
                    >
                      Invite
                    </button>
                  </div>

                  {/* Members */}
                  <div className="border-t pt-4">
                    <p className="font-semibold text-sm mb-3">Members</p>
                    <div className="flex flex-wrap gap-3">
                      {members.map((member) => (
                        <div
                          key={member.id}
                          className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg"
                        >
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-6 h-6 rounded-full"
                          />
                          <span className="text-sm">{member.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Invite Modal */}
                  {showInviteModal === group.id && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                        <h2 className="text-2xl font-bold mb-4 text-coffee">
                          Invite to {group.name}
                        </h2>
                        <p className="text-gray-600 mb-4">Share this code:</p>
                        <div className="flex gap-2 mb-4">
                          <div className="flex-1 bg-gray-50 border border-gray-300 rounded px-3 py-3 font-mono text-lg font-bold text-center">
                            {group.inviteCode}
                          </div>
                          <button
                            onClick={() => handleCopyInviteCode(group.inviteCode)}
                            className="flex items-center gap-2 px-3 py-3 bg-coffee text-white rounded hover:bg-opacity-90 transition"
                          >
                            {copiedCode === group.inviteCode ? (
                              <FiCheck size={18} />
                            ) : (
                              <FiCopy size={18} />
                            )}
                          </button>
                        </div>
                        <button
                          onClick={() => setShowInviteModal(null)}
                          className="w-full px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No groups yet!</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-coffee text-white rounded-lg hover:bg-opacity-90 transition font-semibold"
            >
              <FiPlus size={20} />
              Create Your First Group
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
