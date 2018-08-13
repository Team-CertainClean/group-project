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

-- Storage of types of cleaning for customer selection
create table Cleaning_Type(
    id serial primary key,
    cleaning_type varchar(80)
);
-- Inserts move out and airbnb options into cleaning_type table
insert into Cleaning_Type ("cleaning_type") values ('Move Out'), ('AirBnB'), ('House');

-- Storage of cleaning locations offered
create table Location_Type(
    id serial primary key,
    location_type varchar(80)
);
-- Current location offerings
insert into Location_Type("location_type") values ('Residential'), ('Commercial');

-- Storage of Request information.  start_time and end_time represent the requested start and end time for cleaning.
-- "status" is an integer, either 0, 1, or 2.  0 = unscheduled, 1 = scheduled, 2 = closed.
create table Request(

    id serial primary key,
    cleaning_type_id int references Cleaning_Type,
    location_type_id int references Location_Type not null,
    "start" timestamp with time zone,
    "end" timestamp with time zone,
    est_duration float not null,
    status int default 0
);

-- Storage of Cleaner profile data.  Photo_url may change depending on how AWS is accessed
create table Cleaner(
    id serial primary key,
    first_name varchar(80) not null,
    last_name varchar(80) not null,
    properly_account_id int,
    photo_url varchar(200)
);

-- Storage of Big Calendar object data of Certain Clean Availability, entered manually through admin portal.
create table "availability"(
    id serial primary key,
    "start" timestamp with time zone, -- FORMAT: 'YYYY-MM-DD hh:mm:ss'
    "end" timestamp with time zone -- FORMAT: 'YYYY-MM-DD hh:mm:ss'
);

-- Storage of Scheduled requests, connecting the Request to the chosen Cleaner
create table Schedule(
    id serial primary key,
    cleaner_id int references Cleaner not null,
    request_id int references Request not null
);

-- Storage of Customer contact information while request remains open.  Once closed, moved to Historical_Contact_Data
create table Contact(
    id serial primary key,
    request_id int references Request ON DELETE CASCADE not null ,
    first_name varchar(80),
    last_name varchar(80),
    email varchar(120) not null,
    phone_number varchar(12),
    location_address varchar(200)
);

-- Storage of cleanable rooms with relevant duration metrics, connected to a location type.
create table Room(
    id serial primary key,
    room_name varchar(80),
    location_type_id int references Location_Type not null,
    cleanliness_one_metric float,
    cleanliness_two_metric float,
    cleanliness_three_metric float,
    cleanliness_four_metric float,
    cleanliness_five_metric float
);

-- Current offered rooms (default estimated metrics, replace when provided)
insert into Room ("room_name", "location_type_id", "cleanliness_one_metric", "cleanliness_two_metric", "cleanliness_three_metric", "cleanliness_four_metric", "cleanliness_five_metric") 
values
('Bathroom', 1, 1.75, 1.6, 1.3, 1.15, 1.0),
('Kitchen', 1, 2.625, 2.4, 1.95, 1.725, 1.5),
('Living room', 1, 0.875, 0.8, 0.65, 0.575, 0.5),
('Bedroom', 1, 0.875, 0.8, 0.65, 0.575, 0.5),
('Dining room', 1, 0.875, 0.8, 0.65, 0.575, 0.5);
 -- Etc. 

-- Storage of rooms chosen per Request.
create table Request_Room_Junction(
    id serial primary key,
    request_id int references Request ON DELETE CASCADE not null,
    room_id int references Room,
    cleanliness_score int
);

-- Storage of contact info once a Request is closed.
create table Historical_Contact_Data(
    id serial primary key,
    first_name varchar(80),
    last_name varchar(80),
    email varchar(120) not null,
    phone_number varchar(12)
);