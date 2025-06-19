import { ITaskRepository } from '~/repositories/interfaces/ITaskRepository'
import { IUserRepository } from '~/repositories/interfaces/IUserRepository'
import taskRepository from './implementations/TaskRepository'
import userRepository from './implementations/UserRepository'

// Khởi tạo repositories

export { taskRepository, userRepository, type ITaskRepository, type IUserRepository }
