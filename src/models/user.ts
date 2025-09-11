export enum UserRole {
	Viewer = 'viewer',
	Editor = 'editor',
	Admin = 'admin'
}

export type User = {
	id: number
	username: string
	email: string
	enabled: boolean
	role: UserRole
	avatarPath: string
	raUsername: string
	createdAt: string
	updatedAt: string
	lastLogin: string
	lastActive: string
}
