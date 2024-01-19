export class Project {
  filter(arg0: (task: { findType: string; }) => boolean) {
    throw new Error('Method not implemented.');
  }
     id:any;
	 projectId:any;
	 name:any;
	 type:any;
	 description:any;
	 hours:any;
	startDate:any;
	endDate:any;
	status:any;
	assignee:any;
	 employees:any;
	 subProjects:any;
  tasks: Project | null | undefined;
}
