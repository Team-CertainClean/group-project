-- To get started, create a database using the name below.  
-- The tables contain many references to each other, so you need to go in order.
-- Go down the file and create each table as you go.
-- Perform the insert for Location_Types after creating the table.
-- Perform the insert to Room after creating the table.

-- DATABASE_NAME: Certain_Clean

-- Storage of admin login information
create table Administrator(
	id serial primary key,
	user_name varchar(80) unique not null,
	password varchar(80) not null
);

-- Storage of Request information.  start_time and end_time change when Request is scheduled.
-- "status" is an integer, either 0, 1, or 2.  0 = unscheduled, 1 = scheduled, 2 = closed.
create table Request(
	id serial primary key,
	start_time timestamp,
	end_time timestamp,
	est_duration float not null,
	status int default 0
);

-- Storage of Cleaner profile data.  Photo_url may change depending on how AWS is accessed
create table Cleaner(
	id serial primary key,
	first_name varchar(80) not null,
	last_name varchar(80) not null,
	photo_url varchar(200)
);

-- Storage of Big Calendar object data of Cleaner availability.
create table Cleaner_Availability(
    id serial primary key,
    cleaner_id int references Cleaner on delete cascade,
    start_time timestamp, -- FORMAT: 'YYYY-MM-DD hh:mm:ss'
    end_time timestamp -- FORMAT: 'YYYY-MM-DD hh:mm:ss'
);

-- Storage of Scheduled requests, connecting the Request to the chosen Cleaner
create table Schedule(
	id serial primary key,
	cleaner_id int references Cleaner not null,
	request_id int references Request not null
);

-- Storage of Customer contact information while request remains open.  Once closed, moved to history
create table Contact(
	id serial primary key,
	request_id int references Request not null,
	first_name varchar(80),
	last_name varchar(80),
	email varchar(120) not null,
	phone_number varchar(12)
);

-- Storage of Customer Availability Big Calendar object data: FORMAT {id: int, start: new Date(YYYY, MM, DD, hh, mm, ss), end: new Date(YYYY, MM, DD, hh, mm, ss)}
create table Request_Availability_Calendar_Objects(
	id serial primary key,
	request_id int references Request not null,
	start_time timestamp not null,
	end_time timestamp not null
);

-- Storage of cleaning locations offered
create table Location_Type(
	id serial primary key,
	location_type varchar(80)
);
-- Current location offerings
insert into Location_Type("location_type") values ('Residential'), ('Commercial');

-- Storage of cleanable rooms with relevant duration metrics, connected to a location type.
create table Room(
	id serial primary key,
	room_name varchar(80),
	location_type_id int references Location_Type not null,
	duration_metric float
);
-- Current offered rooms (edit once metrics are provided)
insert into Room ("room_name", "location_type_id", "duration_metric") 
values
(),
(),
(),
(),
(),
(); -- Etc. 

-- Storage of rooms chosen per Request.
create table Request_Room_Junction(
	id serial primary key,
	request_id int references Request not null,
	room_id int references Room not null
);

-- Storage of contact info once a Request is closed.
create table History(
    id serial primary key,
    first_name varchar(80),
    last_name varchar(80),
    email varchar(120) not null,
    phone_number varchar(12)
);