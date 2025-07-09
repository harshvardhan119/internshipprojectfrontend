import {
  DragDropContext,
  Droppable,
  Draggable,
} from '@hello-pangea/dnd';
import {
  BsThreeDots,
  BsFilter,
  BsChat,
} from 'react-icons/bs';
import { AiOutlinePlus } from 'react-icons/ai';
import { FiCalendar } from 'react-icons/fi';
import { FaFolderOpen } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const defaultData = {
  todo: [
    {
      id: '1',
      priority: 'Low',
      title: 'Brainstorming',
      desc: 'Brainstorming brings team members’ diverse experience into play.',
      comments: 12,
      files: 0,
    },
    {
      id: '2',
      priority: 'High',
      title: 'Research',
      desc: 'User research helps you to create an optimal product for users.',
      comments: 10,
      files: 3,
    },
    {
      id: '5',
      priority: 'High',
      title: 'Wireframes',
      desc: 'Low fidelity wireframes include the most basic content and visuals.',
      comments: 8,
      files: 1,
    },
  ],
  progress: [
    {
      id: '3',
      priority: 'Low',
      title: 'Brainstorming',
      desc: 'Same task in progress.',
      comments: 12,
      files: 5,
    },
  ],
  done: [
    {
      id: '4',
      priority: 'Completed',
      title: 'Design System',
      desc: 'It just needs to adapt the UI from what you did before',
      comments: 15,
      files: 1,
    },
  ],
};

export default function TaskBoard() {
  const [columns, setColumns] = useState(() => {
    const saved = localStorage.getItem('task-board-data');
    return saved ? JSON.parse(saved) : defaultData;
  });

  const [formVisible, setFormVisible] = useState({});
  const [formData, setFormData] = useState({
    priority: '',
    title: '',
    desc: '',
    comments: '',
    files: '',
  });
  const [filter, setFilter] = useState('All');
  
  const [showMenu, setShowMenu] = useState(null);

  useEffect(() => {
    localStorage.setItem('task-board-data', JSON.stringify(columns));
  }, [columns]);

  useEffect(() => {
    const closeDropdown = (e) => {
      if (!e.target.closest('.relative')) {
        setShowMenu(null);
      }
    };
    document.addEventListener('click', closeDropdown);
    return () => document.removeEventListener('click', closeDropdown);
  }, []);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) return;

    const sourceCol = [...columns[source.droppableId]];
    const destCol = [...columns[destination.droppableId]];
    const [movedItem] = sourceCol.splice(source.index, 1);
    destCol.splice(destination.index, 0, movedItem);

    setColumns({
      ...columns,
      [source.droppableId]: sourceCol,
      [destination.droppableId]: destCol,
    });
  };

  const toggleForm = (key) => {
    setFormVisible((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    setFormData({
      priority: '',
      title: '',
      desc: '',
      comments: '',
      files: '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddTask = (columnKey) => {
    const newTask = {
      ...formData,
      id: Date.now().toString(),
      comments: Number(formData.comments || 0),
      files: Number(formData.files || 0),
    };

    setColumns((prev) => ({
      ...prev,
      [columnKey]: [...prev[columnKey], newTask],
    }));
    toggleForm(columnKey);
  };

  return (
    <div className="p-6 bg-gray-50 h-full overflow-auto">
      {/* 🔝 HEADER SECTION */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        {/* Left: Title + Icons */}
        <div>
          <div className="flex items-center gap-4 flex-wrap">
            <h1 className="text-3xl font-bold text-gray-800">Mobile App</h1>
            <div className="flex items-center gap-2 text-purple-500 text-xl">
              <img src="/Images/arrow-square-up.png"  alt='avtar' />
              <img src="/Images/link.png" alt='avtar' />
            </div>
          </div>
          <div className="flex mt-7">
            <div className="relative mr-3">
              <button
                onClick={() => setShowMenu((prev) => (prev === 'filter' ? null : 'filter'))}
                className="flex items-center gap-2 px-3 py-1.5 border rounded-md text-sm text-gray-600 bg-white"
              >
                <BsFilter />
                {filter}
              </button>
              {showMenu === 'filter' && (
                <div className="absolute bg-white border mt-1 rounded shadow z-10 w-32">
                  {['All', 'High', 'Low', 'Completed'].map((option) => (
                    <div
                      key={option}
                      className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setFilter(option);
                        setShowMenu(null);
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button className="flex items-center gap-2 px-3 py-1.5 border rounded-md text-sm text-gray-600 bg-white">
              <FiCalendar />
              Today
            </button>
          </div>
        </div>

        {/* Right: Invite & Share */}
        <div>
          <div className="flex items-center gap-4 flex-wrap">
            <button className="text-sm text-purple-600 font-semibold relative">Invite</button>
            <div className="flex items-center -space-x-3">
              <img src="https://i.pravatar.cc/30?img=1" className="w-8 h-8 rounded-full border-2 border-white" alt='avtar' />
              <img src="https://i.pravatar.cc/30?img=2" className="w-8 h-8 rounded-full border-2 border-white"  alt='avtare'/>
              <img src="https://i.pravatar.cc/30?img=3" className="w-8 h-8 rounded-full border-2 border-white"  alt='avtar'/>
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm text-gray-600 border-2 border-white">+2</div>
            </div>
          </div>
          <div className="flex gap-3 mt-5 mr-5">
            <button className="flex items-center gap-2 px-3 py-1.5 border rounded-md text-sm text-gray-600 bg-white mr-3 -mt-1">
              <img src='/Images/profile-2user.png' className='h-3' alt='avtar' />
              Share
            </button>
            <img src="/Images/shareb.png" className='h-6' alt='avtar' />
            <img src="/Images/sharea.png" className='h-6' alt='avtar' />
          </div>
        </div>
      </div>

      {/* 🗂️ KANBAN BOARD */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {Object.entries(columns).map(([key, tasks]) => (
            <div key={key} className="bg-white p-4 rounded-md shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold capitalize">{key}</h3>
                <AiOutlinePlus className="text-gray-500 cursor-pointer" onClick={() => toggleForm(key)} />
              </div>

              {formVisible[key] && (
                <div className="space-y-2 mb-4">
                  <input type="text" name="priority" value={formData.priority} onChange={handleChange} placeholder="Priority (Low, High, Completed)" className="w-full border p-1 rounded text-sm" />
                  <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="w-full border p-1 rounded text-sm" />
                  <textarea name="desc" value={formData.desc} onChange={handleChange} placeholder="Description" className="w-full border p-1 rounded text-sm" />
                  <input type="number" name="comments" value={formData.comments} onChange={handleChange} placeholder="Number of Comments" className="w-full border p-1 rounded text-sm" />
                  <input type="number" name="files" value={formData.files} onChange={handleChange} placeholder="Number of Files" className="w-full border p-1 rounded text-sm" />
                  <button onClick={() => handleAddTask(key)} className="bg-purple-600 text-white text-sm px-3 py-1 rounded">Add Task</button>
                </div>
              )}

              <Droppable droppableId={key}>
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4 min-h-[100px]">
                    {tasks
                      .filter((task) => filter === 'All' || task.priority === filter)
                      .map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided) => (
                            <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className="bg-white border border-blue-200 rounded-xl p-4 shadow-sm">
                              <div className="flex justify-between items-start mb-2">
                                <span className={`text-xs px-2 py-0.5 rounded font-medium ${task.priority === 'High' ? 'bg-red-100 text-red-700' : task.priority === 'Low' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>{task.priority}</span>
                                <BsThreeDots className="text-gray-400 cursor-pointer" />
                              </div>
                              <h4 className="font-semibold text-sm text-gray-900 mb-1">{task.title}</h4>
                              <p className="text-xs text-gray-500 mb-3">{task.desc}</p>
                              <div className="flex justify-between items-center mt-2">
                                <div className="flex -space-x-2">
                                  <img src="https://i.pravatar.cc/24?img=1" className="w-6 h-6 rounded-full border-2 border-white" alt='avtar'/>
                                  <img src="https://i.pravatar.cc/24?img=2" className="w-6 h-6 rounded-full border-2 border-white" alt='avtar'/>
                                  <img src="https://i.pravatar.cc/24?img=3" className="w-6 h-6 rounded-full border-2 border-white" alt='avtar'/>
                                </div>
                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                  <span className="flex items-center gap-1"><BsChat /> {task.comments} comments</span>
                                  <span className="flex items-center gap-1"><FaFolderOpen /> {task.files} files</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
