export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'employee' | 'sales';
  avatar?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'raw-material' | 'finished-product' | 'packaging';
  stockQuantity: number;
  unit: string;
  unitCost: number;
  reorderLevel: number;
  lastUpdated: string;
}

export interface BOMItem {
  id: string;
  name: string;
  description?: string;
  version: string;
  createdAt: string;
  updatedAt: string;
  ingredients: BOMIngredient[];
  packaging: BOMIngredient[];
  totalCost: number;
  yield: number;
  yieldUnit: string;
}

export interface BOMIngredient {
  itemId: string;
  name: string;
  quantity: number;
  unit: string;
  unitCost: number;
  totalCost: number;
}

export interface ProductionOrder {
  id: string;
  bomId: string;
  bomName: string;
  plannedQuantity: number;
  actualQuantity: number;
  unit: string;
  status: 'planned' | 'in-progress' | 'completed' | 'cancelled';
  startDate: string;
  endDate?: string;
  assignedEmployees: string[];
  materialsCost: number;
  laborCost: number;
  totalCost: number;
}

export interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  hourlyRate: number;
  status: 'active' | 'inactive';
  attendanceRecords: AttendanceRecord[];
  productionAssignments: ProductionAssignment[];
}

export interface AttendanceRecord {
  date: string;
  clockIn: string;
  clockOut?: string;
  hoursWorked: number;
}

export interface ProductionAssignment {
  productionOrderId: string;
  date: string;
  hoursWorked: number;
  unitsProduced: number;
  performance: number; // Percentage of expected output
}

export interface Sale {
  id: string;
  date: string;
  customer: Customer;
  products: SoldProduct[];
  paymentStatus: 'paid' | 'unpaid' | 'partial';
  paymentMethod: 'cash' | 'bank-transfer' | 'check' | 'credit';
  totalAmount: number;
  profit: number;
  notes?: string;
}

export interface Customer {
  id: string;
  name: string;
  type: 'individual' | 'business';
  contact: string;
  address?: string;
  creditBalance: number;
}

export interface SoldProduct {
  productId: string;
  name: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
  unitCost: number;
  totalCost: number;
  profit: number;
}

export interface DashboardMetrics {
  totalInventoryValue: number;
  lowStockItems: number;
  ongoingProductions: number;
  dailySales: number;
  employeesPresent: number;
  pendingDeliveries: number;
  monthlyRevenue: number;
  monthlyProfit: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
  }[];
}