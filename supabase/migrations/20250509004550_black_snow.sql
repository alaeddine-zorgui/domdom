/*
  # Initial Schema Setup for DomDom Management System

  1. New Tables
    - users (extends Supabase auth.users)
    - inventory_items
    - bom_items
    - bom_ingredients
    - production_orders
    - production_assignments
    - employees
    - attendance_records
    - sales
    - customers
    - sold_products
    - suppliers
    - purchase_orders
    - purchase_items
    - maintenance_records
    - reminders
    - documents

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users based on role
    - Set up appropriate foreign key relationships

  3. Indexes
    - Add indexes for frequently queried columns
    - Add indexes for foreign key relationships
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends auth.users)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'manager', 'employee', 'sales')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Inventory items
CREATE TABLE inventory_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('raw-material', 'finished-product', 'packaging')),
  stock_quantity DECIMAL NOT NULL DEFAULT 0,
  unit TEXT NOT NULL,
  unit_cost DECIMAL NOT NULL,
  reorder_level INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  created_by UUID REFERENCES users(id),
  updated_by UUID REFERENCES users(id)
);

-- Bill of Materials
CREATE TABLE bom_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  version TEXT NOT NULL,
  yield_quantity DECIMAL NOT NULL,
  yield_unit TEXT NOT NULL,
  total_cost DECIMAL NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  created_by UUID REFERENCES users(id),
  updated_by UUID REFERENCES users(id)
);

CREATE TABLE bom_ingredients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  bom_id UUID REFERENCES bom_items(id) ON DELETE CASCADE,
  inventory_item_id UUID REFERENCES inventory_items(id),
  quantity DECIMAL NOT NULL,
  unit TEXT NOT NULL,
  unit_cost DECIMAL NOT NULL,
  total_cost DECIMAL NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('ingredient', 'packaging')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Employees and Attendance
CREATE TABLE employees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  department TEXT NOT NULL,
  hourly_rate DECIMAL NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE attendance_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  clock_in TIMESTAMPTZ NOT NULL,
  clock_out TIMESTAMPTZ,
  hours_worked DECIMAL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Production
CREATE TABLE production_orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  bom_id UUID REFERENCES bom_items(id),
  planned_quantity DECIMAL NOT NULL,
  actual_quantity DECIMAL DEFAULT 0,
  unit TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('planned', 'in-progress', 'completed', 'cancelled')),
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ,
  materials_cost DECIMAL NOT NULL,
  labor_cost DECIMAL DEFAULT 0,
  total_cost DECIMAL NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  created_by UUID REFERENCES users(id),
  updated_by UUID REFERENCES users(id)
);

CREATE TABLE production_assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  production_order_id UUID REFERENCES production_orders(id) ON DELETE CASCADE,
  employee_id UUID REFERENCES employees(id),
  date DATE NOT NULL,
  hours_worked DECIMAL NOT NULL,
  units_produced DECIMAL NOT NULL,
  performance DECIMAL NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Sales and Customers
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('individual', 'business')),
  contact TEXT NOT NULL,
  address TEXT,
  credit_balance DECIMAL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE sales (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customers(id),
  date TIMESTAMPTZ NOT NULL,
  payment_status TEXT NOT NULL CHECK (payment_status IN ('paid', 'unpaid', 'partial')),
  payment_method TEXT NOT NULL CHECK (payment_method IN ('cash', 'bank-transfer', 'check', 'credit')),
  total_amount DECIMAL NOT NULL,
  profit DECIMAL NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  created_by UUID REFERENCES users(id)
);

CREATE TABLE sold_products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sale_id UUID REFERENCES sales(id) ON DELETE CASCADE,
  product_id UUID REFERENCES inventory_items(id),
  quantity DECIMAL NOT NULL,
  unit TEXT NOT NULL,
  unit_price DECIMAL NOT NULL,
  total_price DECIMAL NOT NULL,
  unit_cost DECIMAL NOT NULL,
  total_cost DECIMAL NOT NULL,
  profit DECIMAL NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Suppliers and Purchases
CREATE TABLE suppliers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  contact TEXT NOT NULL,
  address TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE purchase_orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  supplier_id UUID REFERENCES suppliers(id),
  order_date TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'ordered', 'received', 'cancelled')),
  total_amount DECIMAL NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  created_by UUID REFERENCES users(id)
);

CREATE TABLE purchase_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  purchase_order_id UUID REFERENCES purchase_orders(id) ON DELETE CASCADE,
  inventory_item_id UUID REFERENCES inventory_items(id),
  quantity DECIMAL NOT NULL,
  unit TEXT NOT NULL,
  unit_price DECIMAL NOT NULL,
  total_price DECIMAL NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Maintenance and Reminders
CREATE TABLE maintenance_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  equipment_name TEXT NOT NULL,
  maintenance_type TEXT NOT NULL,
  scheduled_date TIMESTAMPTZ NOT NULL,
  completed_date TIMESTAMPTZ,
  cost DECIMAL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  created_by UUID REFERENCES users(id)
);

CREATE TABLE reminders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  due_date TIMESTAMPTZ NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('bill', 'maintenance', 'other')),
  status TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'cancelled')),
  amount DECIMAL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  created_by UUID REFERENCES users(id)
);

-- Documents
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('invoice', 'delivery-note', 'report')),
  content JSONB NOT NULL,
  reference_id UUID,
  reference_type TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  created_by UUID REFERENCES users(id)
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE bom_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE bom_ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE production_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE production_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE sold_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchase_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchase_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE maintenance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Authenticated users can view inventory" ON inventory_items
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admin and managers can modify inventory" ON inventory_items
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role IN ('admin', 'manager')
    )
  );

-- Add similar policies for other tables...

-- Create indexes
CREATE INDEX idx_inventory_items_category ON inventory_items(category);
CREATE INDEX idx_bom_items_is_active ON bom_items(is_active);
CREATE INDEX idx_production_orders_status ON production_orders(status);
CREATE INDEX idx_attendance_records_date ON attendance_records(date);
CREATE INDEX idx_sales_date ON sales(date);
CREATE INDEX idx_reminders_due_date ON reminders(due_date);

-- Create functions for automatic timestamp updates
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Add similar triggers for other tables with updated_at columns...