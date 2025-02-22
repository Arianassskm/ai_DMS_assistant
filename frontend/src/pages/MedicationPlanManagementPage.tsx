import { useState, useEffect } from "react";
import { PlanManagementHeader } from "../components/plans/PlanManagementHeader";
import { PlanList } from "../components/plans/PlanList";
import { PlanFilters } from "../components/plans/PlanFilters";
import { PlanStats } from "../components/plans/PlanStats";
import { PlanActions } from "../components/plans/PlanActions";
import {
  PlanSortModal,
  type SortOption,
} from "../components/plans/PlanSortModal";
import {
  PlanFilterModal,
  type FilterOptions,
} from "../components/plans/PlanFilterModal";
import { CreatePlanModal } from "../components/plans/CreatePlanModal";
import { useLocalStorageListener } from "@/hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

export function MedicationPlanManagementPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<
    "all" | "active" | "completed"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSortModal, setShowSortModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>("startDate");
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    status: ["active", "completed"],
    dateRange: "all",
  });
  const [showCreatePlan, setShowCreatePlan] = useState<boolean>(false);

  const [isShowTab, setIsShowTab] = useLocalStorageListener("isShowTab", true);

  useEffect(() => {
    setIsShowTab(false);
  }, []);

  const handleBack = () => {
    navigate(-1);
    setIsShowTab(true);
  };

  const hanleOpenCreatePlan = () => {
    setShowCreatePlan(true);
  };

  const handleCreatePlan = () => {
    try {
      setShowCreatePlan(false);
    } catch (error) {
      console.error("Failed to create plan:", error);
    }
  };

  const handleSort = (option: SortOption) => {
    setSortOption(option);
    // TODO: Apply sorting
  };

  const handleFilter = (filters: FilterOptions) => {
    setFilterOptions(filters);
    // TODO: Apply filters
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <PlanManagementHeader onBack={handleBack} />

      <div className="max-w-2xl mx-auto px-4 pb-24">
        <PlanStats />

        <PlanActions
          onCreatePlan={hanleOpenCreatePlan}
          onSort={() => setShowSortModal(true)}
          onFilter={() => setShowFilterModal(true)}
        />

        <PlanFilters
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <PlanList
          filter={activeFilter}
          searchQuery={searchQuery}
          sortOption={sortOption}
          filterOptions={filterOptions}
        />

        <PlanSortModal
          isOpen={showSortModal}
          onClose={() => setShowSortModal(false)}
          onSort={handleSort}
          currentSort={sortOption}
        />

        <PlanFilterModal
          isOpen={showFilterModal}
          onClose={() => setShowFilterModal(false)}
          onFilter={handleFilter}
          currentFilters={filterOptions}
        />

        <CreatePlanModal
          isOpen={showCreatePlan}
          onClose={() => setShowCreatePlan(false)}
          onSubmit={handleCreatePlan}
        />
      </div>
    </div>
  );
}
