class User {
	username: string;
	password: string;
	group: UserGroup;
	constructor(username: string, password: string, group: UserGroup) {
		this.username = username;
		this.password = password;
		this.group = group;
	}
	validate(username: string, password: string, group: UserGroup) {
		return this.username === username && this.password === password && this.group === group;
	}
}

enum UserGroup {
	ADMIN = 'admin',
	STAFF = 'staff'
}

export {User, UserGroup};
