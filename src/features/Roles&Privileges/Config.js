export const rolesPrevilagesData = {
	title: "Roles & Privileges",
	text: "Set privileges for what users can access or modify in the system, based on their role.",
	superAdminRolesList: [

		{
			id: 1,
			tabTextName: "STUDENT",
		  },
	  
		  {
			id: 2,
			tabTextName: "TEACHER",
		  },
	  
		  {
			id: 3,
			tabTextName: "SCHOOL ADMINISTRATOR",
		  },

		  {
			id: 4,
			tabTextName: "DISTRICT ADMINISTRATOR",
		  },
	  
		  {
			id: 5,
			tabTextName: "ADMIN",
		  },
	  
		  {
			id: 6,
			tabTextName: "HELP DESK",
		  },


	],
	
	rolesList:[

		{
			id: 1,
			tabTextName: "STUDENT",
		  },
	  
		  {
			id: 2,
			tabTextName: "PARENT",
		  },
	  
		  {
			id: 3,
			tabTextName: "TEACHER",
		  },

		  {
			id: 4,
			tabTextName: "SCHOOL ADMINISTRATOR",
		  },
	  
		//   {
		// 	id: 5,
		// 	tabTextName: "DISTRICT ADMINISTRATOR",
		//   },



		
	],
	tableColumns: [
		"Privilege",
		"Read",
		"Update",
		"Create",
		"Delete",
		// "Enter data",
		// "Assigned to Class",
	],
	superAdminTableColumns: [
		"Privilege",
		"Read",
		"Update",
		"Create",
		"Delete",
		// "Enter data",
		// "Assigned to Class",
	],
	
};
