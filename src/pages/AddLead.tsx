import { useNavigate } from "react-router-dom";
import { useLeads } from "@/hooks/useLeads";
import { LeadForm } from "@/components/LeadForm";

const AddLead = () => {
  const { addLead } = useLeads();
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Add Lead</h2>
        <p className="text-muted-foreground text-sm mt-1">
          Create a new lead record.
        </p>
      </div>
      <LeadForm
        onAdd={(lead) => {
          addLead(lead);
          navigate("/leads");
        }}
      />
    </div>
  );
};

export default AddLead;
