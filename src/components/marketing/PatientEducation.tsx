import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { patientEducation } from "@/data/marketingData";
import { motion } from "framer-motion";
import { Download } from "lucide-react";

const PatientEducation = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>White-Label Patient Education</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {patientEducation.map(item => (
            <motion.div
              key={item.id}
              whileHover={{ y: -5, boxShadow: "0 10px 20px -5px rgb(0 0 0 / 0.1)" }}
              className="border rounded-lg overflow-hidden group"
            >
              <img src={item.image} alt={item.title} className="h-40 w-full object-cover" />
              <div className="p-4">
                <h4 className="font-semibold truncate">{item.title}</h4>
                <Button className="w-full mt-3" asChild>
                  <a href={item.url} download>
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </a>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientEducation;